const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'Medical license number is required'],
    unique: true,
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Medical specialty is required'],
    enum: [
      'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 
      'Pediatrics', 'Gynecology', 'Psychiatry', 'Ophthalmology',
      'ENT', 'Dentistry', 'General Medicine', 'Surgery',
      'Radiology', 'Pathology', 'Anesthesiology', 'Emergency Medicine'
    ]
  },
  subSpecialty: String,
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: [0, 'Experience cannot be negative']
  },
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: Number, required: true },
    country: { type: String, default: 'India' }
  }],
  certifications: [{
    name: String,
    issuingBody: String,
    issueDate: Date,
    expiryDate: Date,
    certificateNumber: String
  }],
  languages: [{
    type: String,
    required: true
  }],
  hospitalAffiliations: [{
    name: { type: String, required: true },
    address: String,
    position: String,
    startDate: Date,
    endDate: Date,
    isCurrent: { type: Boolean, default: true }
  }],
  consultationFee: {
    inPerson: {
      type: Number,
      required: [true, 'In-person consultation fee is required'],
      min: [0, 'Fee cannot be negative']
    },
    video: {
      type: Number,
      required: [true, 'Video consultation fee is required'],
      min: [0, 'Fee cannot be negative']
    }
  },
  availability: {
    monday: {
      isAvailable: { type: Boolean, default: false },
      slots: [{ startTime: String, endTime: String }]
    },
    tuesday: {
      isAvailable: { type: Boolean, default: false },
      slots: [{ startTime: String, endTime: String }]
    },
    wednesday: {
      isAvailable: { type: Boolean, default: false },
      slots: [{ startTime: String, endTime: String }]
    },
    thursday: {
      isAvailable: { type: Boolean, default: false },
      slots: [{ startTime: String, endTime: String }]
    },
    friday: {
      isAvailable: { type: Boolean, default: false },
      slots: [{ startTime: String, endTime: String }]
    },
    saturday: {
      isAvailable: { type: Boolean, default: false },
      slots: [{ startTime: String, endTime: String }]
    },
    sunday: {
      isAvailable: { type: Boolean, default: false },
      slots: [{ startTime: String, endTime: String }]
    }
  },
  services: [{
    name: String,
    description: String,
    duration: Number, // in minutes
    fee: Number
  }],
  about: {
    type: String,
    maxlength: [1000, 'About section cannot exceed 1000 characters']
  },
  awards: [{
    title: String,
    year: Number,
    issuingBody: String
  }],
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  totalPatients: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: String, // 'license', 'degree', 'certificate'
    url: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  isAcceptingPatients: {
    type: Boolean,
    default: true
  },
  consultationTypes: [{
    type: String,
    enum: ['in-person', 'video', 'phone'],
    default: ['in-person', 'video']
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for user details
doctorSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true
});

// Virtual for experience display
doctorSchema.virtual('experienceDisplay').get(function() {
  return `${this.experience}+ years`;
});

// Index for better query performance
doctorSchema.index({ specialty: 1 });
doctorSchema.index({ 'rating.average': -1 });
doctorSchema.index({ isVerified: 1 });
doctorSchema.index({ isAcceptingPatients: 1 });

// Method to calculate average rating
doctorSchema.methods.calculateAverageRating = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { doctor: this._id } },
    {
      $group: {
        _id: '$doctor',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.rating.average = Math.round(stats[0].averageRating * 10) / 10;
    this.rating.count = stats[0].totalReviews;
  } else {
    this.rating.average = 0;
    this.rating.count = 0;
  }

  await this.save();
};

// Method to check availability for a specific date and time
doctorSchema.methods.isAvailableAt = function(date, time) {
  const dayOfWeek = new Date(date).toLocaleLowerCase();
  const daySchedule = this.availability[dayOfWeek];
  
  if (!daySchedule || !daySchedule.isAvailable) {
    return false;
  }

  // Check if time falls within any available slot
  return daySchedule.slots.some(slot => {
    const slotStart = new Date(`1970-01-01T${slot.startTime}`);
    const slotEnd = new Date(`1970-01-01T${slot.endTime}`);
    const appointmentTime = new Date(`1970-01-01T${time}`);
    
    return appointmentTime >= slotStart && appointmentTime <= slotEnd;
  });
};

module.exports = mongoose.model('Doctor', doctorSchema);
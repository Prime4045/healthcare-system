const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient is required']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
  },
  type: {
    type: String,
    enum: ['in-person', 'video', 'phone'],
    required: [true, 'Appointment type is required']
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  reason: {
    type: String,
    required: [true, 'Reason for appointment is required'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  symptoms: [{
    type: String,
    trim: true
  }],
  notes: {
    patient: {
      type: String,
      maxlength: [1000, 'Patient notes cannot exceed 1000 characters']
    },
    doctor: {
      type: String,
      maxlength: [2000, 'Doctor notes cannot exceed 2000 characters']
    }
  },
  prescription: {
    medications: [{
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      duration: { type: String, required: true },
      instructions: String
    }],
    advice: String,
    followUpDate: Date,
    tests: [{
      name: String,
      instructions: String
    }]
  },
  payment: {
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Amount cannot be negative']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'wallet', 'cash'],
      required: function() {
        return this.payment.status === 'paid';
      }
    },
    transactionId: String,
    paidAt: Date
  },
  cancellation: {
    cancelledBy: {
      type: String,
      enum: ['patient', 'doctor', 'admin']
    },
    reason: String,
    cancelledAt: Date,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed']
    }
  },
  videoCall: {
    roomId: String,
    joinUrl: String,
    startedAt: Date,
    endedAt: Date,
    duration: Number // in minutes
  },
  reminders: {
    sent: [Date],
    nextReminder: Date
  },
  rating: {
    patientRating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String,
      ratedAt: Date
    },
    doctorRating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String,
      ratedAt: Date
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for appointment datetime
appointmentSchema.virtual('appointmentDateTime').get(function() {
  const date = new Date(this.appointmentDate);
  const [hours, minutes] = this.appointmentTime.split(':');
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return date;
});

// Virtual for duration until appointment
appointmentSchema.virtual('timeUntilAppointment').get(function() {
  const now = new Date();
  const appointmentDateTime = this.appointmentDateTime;
  return appointmentDateTime - now;
});

// Virtual for appointment status display
appointmentSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    'scheduled': 'Scheduled',
    'confirmed': 'Confirmed',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
    'no-show': 'No Show'
  };
  return statusMap[this.status] || this.status;
});

// Indexes for better query performance
appointmentSchema.index({ patient: 1, appointmentDate: -1 });
appointmentSchema.index({ doctor: 1, appointmentDate: -1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });

// Pre-save middleware to validate appointment time
appointmentSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('appointmentDate') || this.isModified('appointmentTime')) {
    const appointmentDateTime = this.appointmentDateTime;
    const now = new Date();
    
    // Check if appointment is in the future
    if (appointmentDateTime <= now) {
      return next(new Error('Appointment must be scheduled for a future date and time'));
    }
    
    // Check for conflicting appointments
    const conflictingAppointment = await this.constructor.findOne({
      doctor: this.doctor,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      status: { $in: ['scheduled', 'confirmed', 'in-progress'] },
      _id: { $ne: this._id }
    });
    
    if (conflictingAppointment) {
      return next(new Error('This time slot is already booked'));
    }
  }
  
  next();
});

// Method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const appointmentDateTime = this.appointmentDateTime;
  const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);
  
  return hoursUntilAppointment >= 24 && ['scheduled', 'confirmed'].includes(this.status);
};

// Method to calculate cancellation fee
appointmentSchema.methods.calculateCancellationFee = function() {
  const now = new Date();
  const appointmentDateTime = this.appointmentDateTime;
  const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);
  
  if (hoursUntilAppointment >= 24) {
    return 0; // No fee for cancellation 24+ hours before
  } else if (hoursUntilAppointment >= 2) {
    return this.payment.amount * 0.5; // 50% fee for cancellation 2-24 hours before
  } else {
    return this.payment.amount; // Full fee for cancellation less than 2 hours before
  }
};

// Method to send reminder
appointmentSchema.methods.sendReminder = async function() {
  // Implementation for sending reminder (email/SMS)
  this.reminders.sent.push(new Date());
  
  // Set next reminder (24 hours before appointment)
  const appointmentDateTime = this.appointmentDateTime;
  const reminderTime = new Date(appointmentDateTime.getTime() - (24 * 60 * 60 * 1000));
  
  if (reminderTime > new Date()) {
    this.reminders.nextReminder = reminderTime;
  }
  
  await this.save();
};

module.exports = mongoose.model('Appointment', appointmentSchema);
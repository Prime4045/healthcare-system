const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
require('dotenv').config();

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📊 Connected to MongoDB');

    // Create indexes
    await User.createIndexes();
    await Doctor.createIndexes();
    console.log('📊 Database indexes created');

    // Create sample data
    await createSampleData();
    
    console.log('✅ Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
};

const createSampleData = async () => {
  try {
    // Check if sample data already exists
    const existingUser = await User.findOne({ email: 'patient@demo.com' });
    if (existingUser) {
      console.log('📊 Sample data already exists, skipping creation');
      return;
    }

    // Create sample patient
    const samplePatient = await User.create({
      firstName: 'Rahul',
      lastName: 'Gupta',
      email: 'patient@demo.com',
      password: 'password123',
      phone: '+91 98765 43210',
      userType: 'patient',
      dateOfBirth: new Date('1985-06-15'),
      gender: 'male',
      address: {
        street: '123 MG Road',
        city: 'New Delhi',
        state: 'Delhi',
        zipCode: '110001',
        country: 'India'
      },
      isEmailVerified: true,
      isActive: true
    });

    // Create sample doctor user
    const sampleDoctorUser = await User.create({
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'doctor@demo.com',
      password: 'password123',
      phone: '+91 98765 43212',
      userType: 'doctor',
      isEmailVerified: true,
      isActive: true
    });

    // Create sample doctor profile
    const sampleDoctor = await Doctor.create({
      user: sampleDoctorUser._id,
      licenseNumber: 'MCI123456',
      specialty: 'Cardiology',
      experience: 15,
      education: [{
        degree: 'MBBS',
        institution: 'AIIMS Delhi',
        year: 2005,
        country: 'India'
      }, {
        degree: 'MD Cardiology',
        institution: 'AIIMS Delhi',
        year: 2008,
        country: 'India'
      }],
      languages: ['Hindi', 'English'],
      consultationFee: {
        inPerson: 800,
        video: 600
      },
      availability: {
        monday: {
          isAvailable: true,
          slots: [
            { startTime: '09:00', endTime: '12:00' },
            { startTime: '14:00', endTime: '17:00' }
          ]
        },
        tuesday: {
          isAvailable: true,
          slots: [
            { startTime: '09:00', endTime: '12:00' },
            { startTime: '14:00', endTime: '17:00' }
          ]
        },
        wednesday: {
          isAvailable: true,
          slots: [
            { startTime: '09:00', endTime: '12:00' },
            { startTime: '14:00', endTime: '17:00' }
          ]
        },
        thursday: {
          isAvailable: true,
          slots: [
            { startTime: '09:00', endTime: '12:00' },
            { startTime: '14:00', endTime: '17:00' }
          ]
        },
        friday: {
          isAvailable: true,
          slots: [
            { startTime: '09:00', endTime: '12:00' },
            { startTime: '14:00', endTime: '17:00' }
          ]
        },
        saturday: {
          isAvailable: true,
          slots: [
            { startTime: '09:00', endTime: '13:00' }
          ]
        },
        sunday: {
          isAvailable: false,
          slots: []
        }
      },
      about: 'Specialized in interventional cardiology with expertise in complex cardiac procedures and heart disease prevention.',
      isVerified: true,
      isAcceptingPatients: true,
      consultationTypes: ['in-person', 'video']
    });

    console.log('📊 Sample data created successfully');
    console.log('👤 Sample Patient: patient@demo.com / password123');
    console.log('👨‍⚕️ Sample Doctor: doctor@demo.com / password123');
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  }
};

// Run setup if called directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
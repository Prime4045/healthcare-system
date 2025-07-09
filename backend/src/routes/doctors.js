const express = require('express');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all doctors
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      specialty,
      search,
      location,
      page = 1,
      limit = 10,
      sortBy = 'rating.average',
      sortOrder = 'desc'
    } = req.query;

    let query = { isVerified: true, isAcceptingPatients: true };

    // Filter by specialty
    if (specialty && specialty !== 'All Specialties') {
      query.specialty = { $regex: specialty, $options: 'i' };
    }

    // Search functionality
    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      query.$or = [
        { specialty: searchRegex },
        { subSpecialty: searchRegex },
        { about: searchRegex }
      ];
    }

    const doctors = await Doctor.find(query)
      .populate('user', 'firstName lastName profilePicture')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        doctors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get doctor by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'firstName lastName profilePicture email phone');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { doctor }
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Search doctors
router.get('/search', optionalAuth, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchRegex = { $regex: q, $options: 'i' };
    
    const doctors = await Doctor.find({
      isVerified: true,
      isAcceptingPatients: true,
      $or: [
        { specialty: searchRegex },
        { subSpecialty: searchRegex },
        { about: searchRegex }
      ]
    })
    .populate('user', 'firstName lastName profilePicture')
    .sort({ 'rating.average': -1 })
    .limit(20);

    res.status(200).json({
      success: true,
      data: { doctors }
    });
  } catch (error) {
    console.error('Search doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get doctors by specialty
router.get('/specialty/:specialty', optionalAuth, async (req, res) => {
  try {
    const { specialty } = req.params;
    
    const doctors = await Doctor.find({
      specialty: { $regex: specialty, $options: 'i' },
      isVerified: true,
      isAcceptingPatients: true
    })
    .populate('user', 'firstName lastName profilePicture')
    .sort({ 'rating.average': -1 });

    res.status(200).json({
      success: true,
      data: { doctors }
    });
  } catch (error) {
    console.error('Get doctors by specialty error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get doctor availability
router.get('/:id/availability', protect, async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' });
    const daySchedule = doctor.availability[dayOfWeek];

    if (!daySchedule || !daySchedule.isAvailable) {
      return res.status(200).json({
        success: true,
        data: { availableSlots: [] }
      });
    }

    // Get existing appointments for the date
    const Appointment = require('../models/Appointment');
    const existingAppointments = await Appointment.find({
      doctor: req.params.id,
      appointmentDate: new Date(date),
      status: { $in: ['scheduled', 'confirmed'] }
    });

    const bookedTimes = existingAppointments.map(apt => apt.appointmentTime);

    // Generate available slots
    const availableSlots = [];
    daySchedule.slots.forEach(slot => {
      const startTime = new Date(`1970-01-01T${slot.startTime}`);
      const endTime = new Date(`1970-01-01T${slot.endTime}`);
      
      for (let time = startTime; time < endTime; time.setMinutes(time.getMinutes() + 30)) {
        const timeString = time.toTimeString().slice(0, 5);
        if (!bookedTimes.includes(timeString)) {
          availableSlots.push(timeString);
        }
      }
    });

    res.status(200).json({
      success: true,
      data: { availableSlots }
    });
  } catch (error) {
    console.error('Get doctor availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
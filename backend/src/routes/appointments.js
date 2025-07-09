const express = require('express');
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { protect, restrictTo } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// Book appointment
router.post('/', protect, [
  body('doctor').isMongoId().withMessage('Valid doctor ID is required'),
  body('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
  body('appointmentTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid appointment time is required'),
  body('type').isIn(['in-person', 'video', 'phone']).withMessage('Valid appointment type is required'),
  body('reason').notEmpty().withMessage('Reason for appointment is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { doctor: doctorId, appointmentDate, appointmentTime, type, reason, symptoms, notes } = req.body;

    // Check if doctor exists and is available
    const doctor = await Doctor.findById(doctorId).populate('user');
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    if (!doctor.isAcceptingPatients) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is not accepting new patients'
      });
    }

    // Check if time slot is available
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create appointment
    const appointmentData = {
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      type,
      reason,
      symptoms: symptoms || [],
      notes: { patient: notes || '' },
      payment: {
        amount: type === 'video' ? doctor.consultationFee.video : doctor.consultationFee.inPerson,
        status: 'pending'
      }
    };

    const appointment = await Appointment.create(appointmentData);
    await appointment.populate([
      { path: 'patient', select: 'firstName lastName email phone' },
      { path: 'doctor', populate: { path: 'user', select: 'firstName lastName email' } }
    ]);

    // Send confirmation email
    try {
      await sendEmail({
        email: req.user.email,
        template: 'appointmentConfirmation',
        data: {
          patientName: req.user.fullName,
          doctorName: doctor.user.fullName,
          specialty: doctor.specialty,
          date: new Date(appointmentDate).toLocaleDateString(),
          time: appointmentTime,
          type: type === 'in-person' ? 'In-Person' : 'Video Call',
          location: type === 'in-person' ? doctor.hospitalAffiliations[0]?.name || 'Hospital' : 'Online'
        }
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { appointment }
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user appointments
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = { patient: req.user._id };
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate([
        { path: 'patient', select: 'firstName lastName email phone' },
        { path: 'doctor', populate: { path: 'user', select: 'firstName lastName' } }
      ])
      .sort({ appointmentDate: -1, appointmentTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        appointments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get appointment by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate([
        { path: 'patient', select: 'firstName lastName email phone' },
        { path: 'doctor', populate: { path: 'user', select: 'firstName lastName email' } }
      ]);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user owns this appointment or is the doctor
    if (appointment.patient._id.toString() !== req.user._id.toString() && 
        appointment.doctor.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: { appointment }
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update appointment
router.put('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user owns this appointment
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if appointment can be modified
    if (!appointment.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify appointment within 24 hours'
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: 'patient', select: 'firstName lastName email phone' },
      { path: 'doctor', populate: { path: 'user', select: 'firstName lastName' } }
    ]);

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: { appointment: updatedAppointment }
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Cancel appointment
router.patch('/:id/cancel', protect, [
  body('reason').optional().isString().withMessage('Cancellation reason must be a string')
], async (req, res) => {
  try {
    const { reason } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user owns this appointment
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if appointment can be cancelled
    if (!appointment.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel appointment within 24 hours'
      });
    }

    // Calculate cancellation fee
    const cancellationFee = appointment.calculateCancellationFee();

    // Update appointment
    appointment.status = 'cancelled';
    appointment.cancellation = {
      cancelledBy: 'patient',
      reason: reason || 'Cancelled by patient',
      cancelledAt: new Date(),
      refundAmount: appointment.payment.amount - cancellationFee,
      refundStatus: cancellationFee === 0 ? 'processed' : 'pending'
    };

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: {
        appointment,
        cancellationFee,
        refundAmount: appointment.cancellation.refundAmount
      }
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
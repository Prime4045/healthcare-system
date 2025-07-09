const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Priya Sharma is tomorrow at 10:00 AM',
    type: 'reminder',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Test Results Available',
    message: 'Your blood test results are now available in your health records',
    type: 'results',
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Prescription Refill',
    message: 'Time to refill your prescription for Metformin',
    type: 'prescription',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Get user notifications
router.get('/', protect, async (req, res) => {
  try {
    const { unread, page = 1, limit = 20 } = req.query;
    
    let notifications = [...mockNotifications];
    
    // Filter unread only if requested
    if (unread === 'true') {
      notifications = notifications.filter(not => !not.isRead);
    }

    // Sort by creation date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedNotifications = notifications.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        notifications: paginatedNotifications,
        unreadCount: notifications.filter(not => !not.isRead).length,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: notifications.length,
          totalPages: Math.ceil(notifications.length / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Mark notification as read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = mockNotifications.find(not => not.id === notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.isRead = true;
    notification.readAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: { notification }
    });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Mark all notifications as read
router.patch('/read-all', protect, async (req, res) => {
  try {
    mockNotifications.forEach(notification => {
      notification.isRead = true;
      notification.readAt = new Date().toISOString();
    });

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete notification
router.delete('/:id', protect, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const index = mockNotifications.findIndex(not => not.id === notificationId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    mockNotifications.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
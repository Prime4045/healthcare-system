const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user no longer exists'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }

      // Add user to request object
      req.user = user;
      next();

    } catch (tokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error in authentication'
    });
  }
};

// Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }
    next();
  };
};

// Optional authentication - doesn't fail if no token
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (tokenError) {
        // Token is invalid, but we continue without user
        console.log('Optional auth - invalid token:', tokenError.message);
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue without authentication
  }
};

// Check if user owns the resource
exports.checkOwnership = (resourceUserField = 'user') => {
  return (req, res, next) => {
    // This middleware should be used after protect middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // For admin users, allow access to all resources
    if (req.user.userType === 'admin') {
      return next();
    }

    // Check if the resource belongs to the current user
    // This will be used in route handlers where we have access to the resource
    req.checkOwnership = (resource) => {
      const resourceUserId = resource[resourceUserField];
      return resourceUserId && resourceUserId.toString() === req.user._id.toString();
    };

    next();
  };
};

// Rate limiting for sensitive operations
exports.sensitiveOperationLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map();

  return (req, res, next) => {
    const key = req.ip + ':' + req.user?._id;
    const now = Date.now();
    
    // Clean old entries
    for (const [k, v] of attempts.entries()) {
      if (now - v.timestamp > windowMs) {
        attempts.delete(k);
      }
    }

    const userAttempts = attempts.get(key) || { count: 0, timestamp: now };

    if (userAttempts.count >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Too many attempts. Please try again later.'
      });
    }

    userAttempts.count++;
    userAttempts.timestamp = now;
    attempts.set(key, userAttempts);

    next();
  };
};
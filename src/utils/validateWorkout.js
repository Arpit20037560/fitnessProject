const validator = require('validator');

const validateWorkout = (req) => {
    const { name, duration, intensity, notes } = req.body;

    // Validate name - must not be empty
    if (!name || name.trim().length === 0) {
        throw new Error("Workout name is required");
    }

    // Validate duration - must be a number and greater than 0
    if (!duration || isNaN(duration) || duration <= 0) {
        throw new Error("Workout duration must be a positive number");
    }

    // Validate intensity - must be one of the allowed values
    const allowedIntensities = ['low', 'medium', 'high'];
    if (!intensity || !allowedIntensities.includes(intensity)) {
        throw new Error("Intensity must be one of the following: low, medium, high");
    }

    // Validate notes - optional, but if provided, must be a string
    if (notes && typeof notes !== 'string') {
        throw new Error("Notes must be a string");
    }
};

module.exports = validateWorkout;

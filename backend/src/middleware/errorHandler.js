export function errorHandler(err, req, res, next) {
  console.error('Unhandled Server Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el) => ({
      field: el.path,
      message: el.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed on database schema',
      errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'record';
    return res.status(409).json({
      success: false,
      message: `A requirement with this ${field} already exists.`,
    });
  }

  // CastError (e.g. invalid MongoDB ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid identifier: ${err.value}`,
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred',
  });
}

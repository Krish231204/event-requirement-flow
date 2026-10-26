export function validateRequirement(req, res, next) {
  const { eventName, eventType, startDate, location, category, contact } = req.body;
  const errors = [];

  // Step 1 Basics Validation
  if (!eventName || typeof eventName !== 'string' || eventName.trim().length < 2) {
    errors.push({ field: 'eventName', message: 'Event name is required (min 2 characters).' });
  }

  if (!eventType || typeof eventType !== 'string' || !eventType.trim()) {
    errors.push({ field: 'eventType', message: 'Event type is required.' });
  }

  if (!startDate) {
    errors.push({ field: 'startDate', message: 'Event start date is required.' });
  }

  if (!location || !location.city || !location.city.trim()) {
    errors.push({ field: 'location.city', message: 'City is required in location.' });
  }

  const validCategories = ['planner', 'performer', 'crew'];
  if (!category || !validCategories.includes(category)) {
    errors.push({
      field: 'category',
      message: `Category must be one of: ${validCategories.join(', ')}`,
    });
  }

  // Category-specific Validation
  if (category === 'planner') {
    const planner = req.body.plannerDetails;
    if (!planner) {
      errors.push({ field: 'plannerDetails', message: 'Planner details are required when category is planner.' });
    } else {
      if (!planner.serviceLevel) {
        errors.push({ field: 'plannerDetails.serviceLevel', message: 'Planning service level is required.' });
      }
      if (!planner.estimatedGuests || Number(planner.estimatedGuests) < 1) {
        errors.push({ field: 'plannerDetails.estimatedGuests', message: 'Estimated guest count must be at least 1.' });
      }
    }
  } else if (category === 'performer') {
    const performer = req.body.performerDetails;
    if (!performer) {
      errors.push({ field: 'performerDetails', message: 'Performer details are required when category is performer.' });
    } else {
      if (!performer.performerType) {
        errors.push({ field: 'performerDetails.performerType', message: 'Performer type is required.' });
      }
      if (!performer.performanceFormat || !performer.performanceFormat.trim()) {
        errors.push({ field: 'performerDetails.performanceFormat', message: 'Performance format / duration is required.' });
      }
    }
  } else if (category === 'crew') {
    const crew = req.body.crewDetails;
    if (!crew) {
      errors.push({ field: 'crewDetails', message: 'Crew details are required when category is crew.' });
    } else {
      if (!Array.isArray(crew.rolesNeeded) || crew.rolesNeeded.length === 0) {
        errors.push({ field: 'crewDetails.rolesNeeded', message: 'At least one crew role must be added.' });
      } else {
        const hasInvalidRole = crew.rolesNeeded.some(
          (r) => !r.roleName || !r.roleName.trim() || !r.headcount || Number(r.headcount) < 1
        );
        if (hasInvalidRole) {
          errors.push({ field: 'crewDetails.rolesNeeded', message: 'Each crew role must have a valid role name and headcount >= 1.' });
        }
      }
    }
  }

  // Step 4 Contact Details Validation
  if (!contact) {
    errors.push({ field: 'contact', message: 'Contact information is required.' });
  } else {
    if (!contact.fullName || !contact.fullName.trim()) {
      errors.push({ field: 'contact.fullName', message: 'Full name is required.' });
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!contact.email || !emailRegex.test(contact.email.trim())) {
      errors.push({ field: 'contact.email', message: 'A valid email address is required.' });
    }
    if (!contact.phone || !contact.phone.trim()) {
      errors.push({ field: 'contact.phone', message: 'Contact phone number is required.' });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed for requirement submission',
      errors,
    });
  }

  next();
}

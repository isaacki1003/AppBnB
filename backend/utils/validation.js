const { validationResult, check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
    check('review')
    .isLength({ min: 5 , max: 200 })
		.withMessage('Review must be between 5 and 200 characters'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

const validateSignup = [
	check('email')
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage('Please provide a valid email.'),
	check('username')
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage('Please provide a username with at least 4 characters.'),
	check('username').not().isEmail().withMessage('Username cannot be an email.'),
	check('password')
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage('Password must be 6 characters or more.'),
	check('firstName')
		.exists({ checkFalsy: true })
		.isLength({ min: 1 })
		.withMessage('Please provide a first name with at least 1 characters.'),
	check('lastName')
		.exists({ checkFalsy: true })
		.isLength({ min: 1 })
		.withMessage('Please provide a last name with at least 1 characters.'),
	handleValidationErrors
];

const validateSpot = [
	check('address')
		.exists({ checkFalsy: true })
		.withMessage('Street address is required'),
	check('city').exists({ checkFalsy: true }).withMessage('City is required'),
	check('state').exists({ checkFalsy: true }).withMessage('State is required'),
	check('country')
		.exists({ checkFalsy: true })
		.withMessage('Country is required'),
	check('name')
		.exists({ checkFalsy: true })
		.withMessage('Name is required')
		.bail()
		.isLength({ max: 250 })
		.withMessage('Name must be less than 250 characters')
		.bail()
		.notEmpty()
		.withMessage('Name must be more than 1 characters'),
	check('description')
		.exists({ checkFalsy: true })
		.withMessage('Description is required')
    .bail()
		.isLength({ min: 30, max: 300 })
		.withMessage('Description must be more than 30 characters'),
	check('price')
		.exists()
		.withMessage('Price per day is required')
		.bail()
		.isInt({ min: 1 })
		.withMessage('Minimum price is $1'),
	handleValidationErrors
];

const validateBooking = [
	check('startDate').isDate().withMessage('Must be date with format: YYYY-MM-DD'),
	check('endDate').isDate().withMessage('Must be date with format: YYYY-MM-DD'),
	handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateSpot,
  validateSignup,
  validateReview,
  validateBooking
};

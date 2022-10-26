const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const checkEmail  = await User.findOne({
    where: { email }
  });

  const checkUsername = await User.findOne({
    where: { username }
  });

  if (checkEmail) {
    return res
      .status(403)
      .json({
        message: 'User already exists',
        statusCode: res.statusCode,
        errors: ['User with that email already exists']
      });
  };

  if (checkUsername) {
    return res
      .status(403)
      .json({
        message: 'User already exists',
        statusCode: res.statusCode,
        errors: ['User with that username already exists']
      });
  };

  const user = await User.signup({ firstName, lastName, email, username, password });

  const token = await setTokenCookie(res, user);

  const userRes = user.toJSON();

  userRes.token = token;

  return res.json(userRes);

});
module.exports = router;

const express = require('express');
const router = express.Router();
const { Spot, User, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');





module.exports = router;

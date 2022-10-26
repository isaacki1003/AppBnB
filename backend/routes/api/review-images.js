const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await ReviewImage.findByPk(req.params.imageId);

    if (!image) {
      return res
        .status(404)
        .json({
          message: "Review Image couldn't be found",
          statusCode: res.statusCode
        });
    };

    await image.destroy();

    return res
      .status(200)
      .json({
        message: 'Successfully deleted',
        statusCode: res.statusCode
      });
  });

  module.exports = router;

const order = require('../../../models/admins/order/order');
const Bag = require('../../../models/admins/bags/bag');
const respondmanger = require('../../../utilities/respondmanger');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants');

const createanorder = async (req, res) => {
  // console.log('Request Body:', req.body);
  const { userId, bagIds } = req.body;

  try {
    // console.log('User ID:', userId);
    // console.log('Bag IDs:', bagIds);

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return respondmanger.badrequest(res, 'Invalid user ID');
    }

    // Validate bag IDs
    if (!Array.isArray(bagIds) || bagIds.length === 0) {
      return respondmanger.badrequest(res, 'Bag IDs must be a non-empty array');
    }
    const invalidBagIds = bagIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidBagIds.length > 0) {
      return respondmanger.badrequest(res, 'Some bag IDs are invalid');
    }

    // Fetch bags
    const bags = await Bag.find({ _id: { $in: bagIds }, userId });
    // console.log('Fetched Bags:', bags);

    if (!bags || bags.length !== bagIds.length) {
      return respondmanger.badrequest(res, 'Some bags are invalid or do not belong to the user');
    }

    // Create new order
    const newOrder = new order({
      userId,
      bagIds: bagIds,
      status: 'created',
    });
    // console.log('New Order Object:', newOrder);

    const savedOrder = await newOrder.save();
    // console.log('Saved Order:', savedOrder);

    return respondmanger.onsuccess(res, savedOrder, 'Successfully created an order');
  } catch (error) {
    console.error('Error creating order:', error);
    return respondmanger.servererror(res,constants.RESPONSE_MESSAGES.SERVER_ERROR);
  }
};

module.exports = createanorder;
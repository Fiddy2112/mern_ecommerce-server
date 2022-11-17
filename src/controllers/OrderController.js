const Order = require("../models/order.js");

class OrderController {
  /**
   * @route POST api/v1/orders
   * @desc Create order
   * @access Private
   */

  async create(req, res) {
    const newOrder = new Order(req.body);
    try {
      const saveOrder = await newOrder.save();
      res.status(200).json({
        success: true,
        message: "Create cart successfully",
        saveOrder,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route PUT api/v1/orders/:id
   * @desc Update order
   * @access Private
   */

  async update(req, res) {
    const orderUpdatedCondition = { _id: req.params.id };
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderUpdatedCondition,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "Order updated successfully!",
        updatedOrder,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route DELETE api/v1/orders/:id
   * @desc Delete order
   * @access Private
   */

  async delete(req, res) {
    try {
      const cartDeletedCondition = { _id: req.params.id, user: req.id };
      await Cart.findByIdAndDelete(cartDeletedCondition);
      res.status(200).json({
        success: true,
        message: "Cart has been deleted...",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route GET api/v1/orders/:id
   * @desc get order
   * @access Private
   */

  async getOrder(req, res) {
    try {
      // const cartId = { _id: req.params.id };
      const findOrder = await Cart.find({ userId: req.params.userId });
      res.status(200).json({
        success: true,
        message: "Order",
        findOrder,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route GET api/v1/orders/:id
   * @desc get all order
   * @access Private
   */

  async getAllOrder(req, res) {
    try {
      const orders = await Order.find();
      res.status(200).json({
        success: true,
        message: "Get all order successfully",
        orders,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * @route GET api/v1/orders/:id
   * @desc get monthly income
   * @access Private
   */

  async monthlyIncome(req, res) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createAt: { $gte: previousMonth },
          },
        },
        {
          $project: { month: { $month: "$createAt" }, sales: "$amount" },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new OrderController();

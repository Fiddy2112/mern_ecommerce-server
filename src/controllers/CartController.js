const Cart = require("../models/cart.js");

class CartController {
  /**
   * @route POST api/v1/carts
   * @desc Create cart
   * @access Private
   */

  async create(req, res) {
    const newCart = new Cart(req.body);
    try {
      const saveCart = await newCart.save();
      res.status(200).json({
        success: true,
        message: "Create cart successfully",
        saveCart,
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
   * @route PUT api/v1/carts/:id
   * @desc Update cart
   * @access Private
   */

  async update(req, res) {
    const cartUpdatedCondition = { _id: req.params.id, user: req.id };
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        cartUpdatedCondition,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "Cart updated successfully!",
        updatedCart,
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
   * @route DELETE api/v1/carts/:id
   * @desc Delete cart
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
   * @route GET api/v1/carts/:id
   * @desc get cart
   * @access Private
   */

  async getCart(req, res) {
    try {
      // const cartId = { _id: req.params.id };
      const findProduct = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json({
        success: true,
        message: "Product",
        findProduct,
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
   * @route GET api/v1/carts/:id
   * @desc get all cart
   * @access Private
   */

  async getAllCart(req, res) {
    try {
      const carts = await Cart.find();
      res.status(200).json({
        success: true,
        message: "Get all cart successfully",
        carts,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new CartController();

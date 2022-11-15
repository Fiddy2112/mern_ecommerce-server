const Product = require("../models/product.js");

class ProductController {
  /**
   * @route POST api/courses
   * @desc Create course
   * @access Private
   */

  async create(req, res) {
    const newProduct = new Product(req.body);
    try {
      const saveProduct = await newProduct.save();
      res.status(200).json({
        success: true,
        message: "Create product successfully",
        saveProduct,
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

module.exports = new ProductController();

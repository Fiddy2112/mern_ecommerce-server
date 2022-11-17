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

  async update(req, res) {
    const productUpdatedCondition = { _id: req.params.id, user: req.id };
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productUpdatedCondition,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        updatedProduct,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async delete(req, res) {
    try {
      const productDeletedCondition = { _id: req.params.id, user: req.id };
      await Product.findByIdAndDelete(productDeletedCondition);
      res.status(200).json({
        success: true,
        message: "Product has been deleted...",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getProduct(req, res) {
    try {
      const productId = { _id: req.params.id };
      const findProduct = await Product.findById(productId);
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

  async getAllProduct(req, res) {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try {
      let products;

      if (queryNew) {
        products = await Product.find().sort({ createAt: -1 }).limit(5);
      } else if (queryCategory) {
        products = await Product.find({
          categories: {
            $in: [queryCategory],
          },
        });
      } else {
        products = await Product.find();
      }
      res.status(200).json(products);
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

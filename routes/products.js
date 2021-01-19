const express = require("express");
const router = express.Router();
const model = require("../models/index");

// GET products listing.
router.get("/", async function (req, res, next) {
  const products = await model.products.findAll({});
  try {
    if (products.length !== 0) {
      res.json({
        status: "OK",
        message: "Getting all products",
        data: products,
      });
    } else {
      res.json({
        status: "ERROR",
        message: "EMPTY",
        data: {},
      });
    }
  } catch (error) {
    res.json({
      status: "ERROR",
      messages: error.message,
      data: {},
    });
  }
});
// POST products
router.post("/", async function (req, res, next) {
  try {
    const { name, description, price, stock } = req.body;
    const product = await model.products.create({
      name,
      description,
      price,
      stock,
    });
    if (product) {
      res.json({
        status: "OK.",
        message: "Product created.",
        data: product,
      });
    }
  } catch (error) {
    res.json({
      status: "ERROR",
      messages: error.message,
      data: {},
    });
  }
});
// UPDATE products
router.patch("/:id", async function (req, res, next) {
  try {
    const productID = req.params.id;
    const { name, description, price, stock } = req.body;
    const product = await model.products.findByPk(productID);
    const isUpdated = await model.products.update(
      {
        name,
        description,
        price,
        stock,
      },
      {
        where: {
          id: productID,
        },
      }
    );
    if (isUpdated) {
      res.json({
        status: "OK.",
        message: "Product updated.",
        data: product,
      });
    }
  } catch (error) {
    res.json({
      status: "ERROR",
      messages: error.message,
      data: {},
    });
  }
});
// DELETE products
router.delete("/:id", async function (req, res, next) {
  try {
    const productID = req.params.id;
    const product = await model.products.findByPk(productID);
    const isDeleted = await model.products.destroy({
      where: {
        id: productID,
      },
    });
    if (isDeleted) {
      res.json({
        status: "OK.",
        message: "Product deleted.",
        data: product,
      });
    }
  } catch (error) {
    res.json({
      status: "ERROR",
      messages: error.message,
      data: {},
    });
  }
});
module.exports = router;

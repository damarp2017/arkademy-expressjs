var express = require("express");
var router = express.Router();
const model = require("../models/index");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const products = await model.products.findAll({});
  res.render("product", { products: products });
});

router.get("/new", function (req, res, next) {
  res.render("create", {});
});

router.get("/edit/:id", async function (req, res, next) {
  const product = await model.products.findByPk(req.params.id);
  res.render("edit", { product: product });
});

router.post("/update/:id", async function (req, res, next) {
  const product = await model.products.findByPk(req.params.id);
  const { name, description, price, stock } = req.body;
  const isUpdated = await model.products.update(
    {
      name,
      description,
      price,
      stock,
    },
    {
      where: {
        id: product.id,
      },
    }
  );
  if (isUpdated) {
    res.redirect("/");
  }
});

router.get("/delete/:id", async function (req, res, next) {
  const product = await model.products.findByPk(req.params.id);
  const isDeleted = await model.products.destroy({
    where: {
      id: product.id,
    },
  });
  if (isDeleted) {
    res.redirect("/");
  }
});

router.post("/store", async function (req, res, next) {
  const { name, description, price, stock } = req.body;
  const product = await model.products.create({
    name,
    description,
    price,
    stock,
  });
  if (product) {
    res.redirect("/");
  }
});

module.exports = router;

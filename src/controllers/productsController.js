const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const productsPath = path.join(__dirname, "../data/products.json");

const productsController = {
  /* CRUD */
  getProducts: () => {
    return JSON.parse(fs.readFileSync(productsPath, "utf-8"));
  },
  index: (req, res) => {
    res.render("../views/products/index", {
      title: "Products List",
      stylesheetFile: "productList.css",
      productsList: productsController.getProducts(),
    });
  },
  create: (req, res) => {
    res.render('products/create', {
      title: "Crear producto",
      stylesheetFile: "productList.css",
    });
  },
  store: (req, res) => {
    let products = productsController.getProducts();
    let image = req.file? req.file.filename : "default.jpg";

    console.log("body: ", req.body);

    let newProduct = {
      "id": uuidv4(),
      "name": req.body.nameProduct || "sin nombre",
      "description": req.body.descProduct || "sin descripcion",
      "price": req.body.priceProduct || 0,
      "image": image,
      "category": req.body.categoryProduct || "Hombre",
      "color": req.body.colorProduct || "Azul",
      "size": req.body.sizeProduct || 40,
      "available": true
    };

    products.push(newProduct)
    fs.writeFileSync(productsPath, JSON.stringify(products, null, "  "));
    res.redirect("/products");
  },
  edit: (req, res) => {
    let productId = req.params.id;
    let product = productsController.getProducts().find((product) => product.id == productId);

    res.render("../views/products/edit", {
      title: "Mi product",
      stylesheetFile: "editProduct.css",
      product
    });
  },
  update: (req, res) => {
    let productId = req.params.id;
    console.log("body: ", req.body);
    let products = productsController.getProducts();

    products.forEach((product, index) => {
      if (product.id == productId) {
        product.name = req.body.nameProduct || "sin nombre";
        product.description = req.body.descProduct || "sin descripcion";
        product.price = req.body.priceProduct || 0;

        products[index] = product;
      }
    });

    fs.writeFileSync(productsPath, JSON.stringify(products, null, "  "));

    res.redirect("/products");
  },

  delete: (req, res) => {
    let productId = req.params.id;
    let product = productsController.getProducts().find((product) => product.id == productId);
    res.render('products/delete', {
      title: "Borrar producto",
      stylesheetFile: "editProduct.css",
      product
    });
  },
  destroy: (req, res) => {
    let productId = req.params.id;
    let products = productsController.getProducts();
    let newProducts = products.filter(product => product.id != productId)

    console.log("producto a borrar: ", productId, products);

    fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, "  "));

    res.redirect("/products");
  },
  /* END CRUD */

  products: (req, res) => {
    res.render("../views/products/productDetail", {
      title: "Product-Detail",
      stylesheetFile: "productDetail.css",
    });
  },
  productCart: (req, res) => {
    res.render("../views/products/productCart", {
      title: "Product-Cart",
      stylesheetFile: "productCart.css",
    });
  },
  productRegister: (req, res) => {
    res.render("../views/products/productRegister", {
      title: "Products-Register",
      stylesheetFile: "registerProduct.css",
    });
  },
  productEdit: (req, res) => {
    res.render("../views/products/productEdit", {
      title: "Products-Edit",
      stylesheetFile: "editProduct.css",
    });
  },
  


};

module.exports = productsController;

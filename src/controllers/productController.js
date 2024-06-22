const Product = require('../models/product');

// Controller functions
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.quantity = req.body.quantity || product.quantity;
      product.category = req.body.category || product.category;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Method to delete all products
  const deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({});
      res.status(200).json({ message: 'All products deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const searchProductsByName = async (req, res) => {
    try {
      const keyword = req.query.name;
      if (!keyword) {
        return res.status(400).json({ message: 'Query parameter "name" is required' });
      }
  
      const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
  deleteAllProducts
};

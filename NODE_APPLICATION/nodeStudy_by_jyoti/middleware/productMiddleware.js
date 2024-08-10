// middleware/productMiddleware.js

// Define a simple middleware function
const myMiddleware = (req, res, next) => {
    const { price, quantity } = req.body;
  
    if (Number.isInteger(price) && Number.isInteger(quantity)) {
      next();
    } else {
      console.log('Price and Quantity should be numbers');
     // return res.status(400).json({ error: 'Price and Quantity should be numbers' });
    }
  };
  
  // Export the middleware function
  module.exports = myMiddleware;
  
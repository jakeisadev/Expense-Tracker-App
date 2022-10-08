const mongoose = require("mongoose");
// Initalize MongoDB

const transactionSchema = new mongoose.Schema({
  // Create the layout of the Transaction object
  userid: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }
});

// Attach transactionModel to the new objects
const transactionModel = mongoose.model("Transactions", transactionSchema);

// Return each new transactionModel to the database for access
module.exports = transactionModel;

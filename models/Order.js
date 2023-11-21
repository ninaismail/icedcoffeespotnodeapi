const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    icedcoffees: { type: Object, required: true },
    total_amount: { type: Number, required: true },
    address: { type: Object, required: true },
    note: { type: Object},
    type_of_destinattion: { type: Number, default: 1 },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
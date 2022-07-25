const mongoose = require("mongoose");
const medicationSchema = mongoose.Schema(
  {
    medicationName: { type: String },
    note: { type: String },
    dosage: { type: String },
    frequency: { type: String },
    refilRequest: { type: Boolean },
    expiryDate: { type: Date },
   
    sideEffects: { type: String },
    contraindication: { type: String },
    duration: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medication", medicationSchema);

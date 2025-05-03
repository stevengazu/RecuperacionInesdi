const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true }, // Campo obligatorio
  last_name: { type: String, required: true },  // Campo obligatorio
  email: { type: String, required: true, unique: true }, // Campo único
  gender: { type: String, enum: ["Male", "Female", "Other"] }, // Valores permitidos
  address: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    country_code: { type: String, required: true },
  },
  card: {
    card_number: { type: String, required: true },
    card_type: { type: String, required: true },
    currency_code: { type: String, required: true },
    balance: { type: String, required: true },
  },
  married_status: { type: Boolean, required: true },
});

  module.exports = mongoose.model("User", userSchema);
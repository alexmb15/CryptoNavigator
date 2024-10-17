const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  image_url: { type: String }, // New field for icon URL
  platforms: { type: Map, of: String }, // Platform number as key, smart contract address as value
  current_price: { type: Number },
  market_cap: { type: Number },
  total_volume: { type: Number },
  high_24h: { type: Number },
  low_24h: { type: Number },
  price_change_24h: { type: Number },
  price_change_percentage_24h: { type: Number },
  market_cap_rank: { type: Number },
  fully_diluted_valuation: { type: Number },
  last_updated: { type: Date },
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;

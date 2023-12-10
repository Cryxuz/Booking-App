import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema({
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number
})
// 'Place' is a mongoDB collection
const PlaceModel = mongoose.model('Place', placeSchema)

export default PlaceModel
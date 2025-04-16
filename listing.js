const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  description: String,

  image: {
    url : String,
    filename: String,
},

  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  // WE CAN ADD THIS FIELD FOR OUR FILTERS AND ICONS IN MAIN PAGE 
  // category : {
  //   type : String,
  //   enum : ["mountains", "arctic", "farms", "beaches" , "deserts"]
  // }
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if (listing){
await review.deleteMany({ _id: { $in: listing.reviews } });
}
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
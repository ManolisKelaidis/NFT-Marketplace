const mongoose = require('mongoose');

const BidSchema=new mongoose.Schema({
ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
        ownerId: {
                type: String,
                required: false,
        },      
        assetId: {
                type: String,
                required: true,
        },      
        bidderId: {
                type: String,
                required: true,
        },      
        price: {
                type: Number,
                required: true,
        },      
        date: {
                type: String,
                required: true,
        },      
}, {timestamps: true});

module.exports=mongoose.model('Bid', BidSchema, 'bids');
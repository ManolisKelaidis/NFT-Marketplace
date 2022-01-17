const mongoose = require('mongoose');

const CollectionSchema=new mongoose.Schema({
ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
        ownerId: {
                type: String,
                required: false,
        },      
        title: {
                type: String,
                required: true,
        },      
        owner: {
                type: String,
                required: true,
        },      
        category: {
                type: String,
                enum : ["Art","Photography","Games","Metaverses","Music","Domains","Memes"],
                required: true,
        },      
}, {timestamps: true});

module.exports=mongoose.model('Collection', CollectionSchema, 'collections');
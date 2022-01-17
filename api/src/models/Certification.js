const mongoose = require('mongoose');

const CertificationSchema=new mongoose.Schema({
ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
        ownerId: {
                type: String,
                required: false,
        },      
        owner: {
                type: String,
                required: true,
        },      
        collectionId: {
                type: String,
                required: false,
        },      
        yearCreated: {
                type: String,
                required: false,
        },      
        description: {
                type: String,
                required: true,
        },      
        title: {
                type: String,
                required: true,
        },      
        price: {
                type: String,
                required: false,
        },      
        likes: {
                type: String,
                required: false,
        },      
        unencryptedFiles: [
                    String      
  ],      
        encryptedFiles: [
                    {
        path: {
                type: String,
                required: false,
        },      
        content: {
                type: String,
                required: false,
        },      
},      
  ],      
        royalty: {
                type: String,
                required: false,
        },      
        properties: {
                type: String,
                required: false,
        },      
        saleType: {
                type: String,
                enum : ["PutOnSale","InstantSalePrice","UnlockOnePurchased"],
                required: true,
        },      
}, {timestamps: true});

module.exports=mongoose.model('Certification', CertificationSchema, 'certifications');
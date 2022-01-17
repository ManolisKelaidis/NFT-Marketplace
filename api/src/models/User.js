const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
        firstName: {
                type: String,
                required: false,
        },      
        lastName: {
                type: String,
                required: false,
        },      
        description: {
                type: String,
                required: false,
        },      
        username: {
                type: String,
                required: true,
        },      
        email: {
                type: String,
                required: true,
        },      
        password: {
                type: String,
                required: true,
        },      
        facebookId: {
                type: String,
                required: false,
        },      
        instagramId: {
                type: String,
                required: false,
        },      
        twitterId: {
                type: String,
                required: false,
        },      
        mysiteId: {
                type: String,
                required: false,
        },      
        followers: {
                type: String,
                required: false,
        },      
        totalEthereum: {
                type: String,
                required: false,
        },      
        status: {
                type: String,
                enum : ["active","notactivated","notverified","deleted","blocked","invited","suspended"],
                default: "active",
                required: false,
        },      
        level: {
                type: String,
                enum : ["anonymous","none","bronze","silver","gold","diamond"],
                default: "anonymous",
                required: false,
        },      
        role: {
                type: String,
                enum : ["admin","moderator","consumer"],
                default: "consumer",
                required: false,
        },      
}, {timestamps: true});

module.exports=mongoose.model('User', UserSchema, 'users');
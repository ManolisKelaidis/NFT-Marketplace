const mongoose = require('mongoose');

const NotificationSchema=new mongoose.Schema({
ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
        title: {
                type: String,
                required: true,
        },      
        body: {
                type: String,
                required: true,
        },      
        click_action: {
                type: String,
                required: false,
        },      
        type: {
                type: String,
                enum : ["user","asset","bid","chat"],
                default: "wall",
                required: false,
        },      
        status: {
                type: String,
                enum : ["new","hidden","read","deleted"],
                default: "new",
                required: true,
        },      
}, {timestamps: true});

module.exports=mongoose.model('Notification', NotificationSchema, 'notifications');
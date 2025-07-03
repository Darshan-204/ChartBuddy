const mongoose=require("mongoose")

//schema for store the message sent to various user of app
const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    file:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})




//schema for store  conservation done  btw two people
const ConservationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    message:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Message"
        }
    ]
    
},{
    timestamps:true
})
const MessageModel=mongoose.model('Message',messageSchema);
const ConservationModel=mongoose.model('conversation',ConservationSchema);

module.exports={
    MessageModel,
    ConservationModel
}
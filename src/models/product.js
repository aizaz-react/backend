
const mongoose =require('mongoose');
const productSchema=new mongoose.Schema({
 name:{
        type:String,
        required:[true,'please Enter product name'],
        trim:true,
        
    },

 slug:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    size:[
       
    ],
    colour:[
       
    ],
     price:{
         type:String,
         required:[true,'please Enter price '],
         maxlength:[5, 'product price can not exceed the 4 character'],
         
     }, 
     Stock:{
        type:Number,
        required:[true,'please Enter Stock'],
    },
     discountprice:{ 
         type:String
        
    },
    description:{

        type:String,
        required:[true,'please Enter description of product'],
        trim:true
    },
    
    offer:{
        type:Number
    },
    brand:{

        type:String,
        required:[true,'please Enter Brand of product'],
        trim:true
    },
    
    productPicture:[
        {
          img:{type:String}}
    ],
    
category:{
   type: mongoose.Schema.Types.ObjectId,ref:'Category',
   required:true},
   
   ratings:{
    type:Number,
    default:0
},
 numOfReviews:{
  type:Number,
  default:0
},
reviews:[
    { 
        user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        firstName:{
            type:String,
        
            
            
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
}
],

createdBy:{
    type:mongoose.Schema.Types.ObjectId,ref:'User',required:true, 
    updatedAt:Date,}
 

},{timestamps:true});
module.exports=mongoose.model('Product',productSchema);



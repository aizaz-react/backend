const express=require('express');
const env =require ('dotenv');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
// routes
const userRoutes =require('./routes/user');


// enviroment variables
 env.config();
//  mongooseconnection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qixbq.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,


    
    
}
).then(()=>{
    console.log('Database connected')
});

//  passing middle ware to post the APi
 //app.use(bodyParser());
 app.use(bodyParser.json());
 app.use('/api',userRoutes);

//  app.get('/',(req,res,next)=>{
//      res.status(200).json({
//          message:'Hello from  server'
//      });
//  });
//  app.post('/data',(req,res,next)=>{
//     res.status(200).json({
//         message:req.body
//     });
// });


app.listen(process.env.PORT,()=>{
    console.log(`server is running son port ${process.env.PORT}`);
});
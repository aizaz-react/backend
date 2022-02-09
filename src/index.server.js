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
 app.use(bodyParser());
  app.use('/api',userRoutes);
  



app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});
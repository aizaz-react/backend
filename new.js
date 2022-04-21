exports.signin=(req,res)=>{
 
    User.findOne({email:req.body.email})
    .exec((error,user) =>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
             
                const token=jwt.sign({id: user.id}.process.env.JWT_SECRET,{expiresIn:'1hr'});
                const {firstName,lastName,email,role,fullName } =user;
            res.status(200).json({
                token,
                user:{
                    firstName,lastName,email,role,fullName
                }
            });
        }
        }
        else{
            return res.status(400).json({message:'Something went wrong'});
        }

    });
}

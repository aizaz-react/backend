const Category =require ('../models/category');
const slugify=require('slugify');
const category = require('../models/category');
const res = require('express/lib/response');
const { json } = require('body-parser');
const req = require('express/lib/request');
// const category = require('../models/category');
function createCategories(categories,parentId=null){


    const categoryList=[];
    let category;
    if(parentId == null){
       category= categories.filter(cat => cat.parentId ==undefined);
    }else{
        category=categories.filter(cat =>cat.parentId==parentId)

    }
    for(let  cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            parentId:cate.parentId,
            children:createCategories(categories ,cate._id)

        });
    }
    return categoryList;
};

exports.addcategory=(req, res)=>{
  
    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)
       
    }
    if(req.file){
        
        categoryObj.categoryImage=process.env.API+'/public/'+req.file.filename;
            }
    

        if(req.body.parentId){  
        categoryObj.parentId=req.body.parentId;
    }
    const cat = new Category(categoryObj);

    cat.save((error,category)=>{
      if(error) return res.status(400).json({error});
      if(category){
          return res.status(201).json({category});
      } 
    });

}

exports.getCategories =(req,res)=>{
    Category.find({})
    .exec((error,categories)=>{
    if(error) return res.status(400).json({error});
    if(categories){
        const categoryList = createCategories(categories);
        res.status(200).json({categoryList});
    }

    });
}
// exports.updateCategories = async  (req,res)=>{

//     const {_id, name,parentId,type} = req.body;
//        const updateCategories=[];
//        if(name instanceof Array)
        
        
//         for (var key in categories[i]) {
//             if (categories[i].hasOwnProperty(key) && key!="_id") {
//                 category[key]=categories[i][key]
//                 //console.log(key + " -> " + categories[i][key]);
//             }
//             if (key=="_id"){
//                 var _id=categories[i][key];
//             }
            
//         }
//         console.log(category)
//         console.log(_id);
//         const updatedCategory = await Category.findOneAndUpdate({_id:_id},category,{new:true});
//     }
//     return res.status(201).json({"test":2343});
//    const{name,parentId,type} =req.body;
//    const _id=req.params.id;
//    const updatedCategories= [];
//    if(name instanceof Array){
//        for (let i=0;i<name.length;i++){
//            const category ={
//                name:name[i],
//                type:type[i]

//            };
//           if(parentId[i] !==""){
//               category.parentId=parentId[i];

//           }

//          const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]} ,category, {new:true});
//          updatedCategories.push({updatedCategory});
         
//        }  
//        return res.status(201).json({updateCategories:updatedCategories});
//    }else{
//        const category={
//            name,
//            type
//        };
//        if(parentId !== ""){
//            category.parentId=parentId;
//        }
//        const updatedCategory = await Category.findOneAndUpdate({_id},category,{new:true});
//        return res.status(201).json(  {updatedCategory});

//    }

   //} 




exports.deleteCategories= async (req,res) =>{
    const{ id}=req.body;
    const deletedCategories=[];
    for(let i=0 ;i< id.length; i++){
        const deleteCategory = await Category.findOneAndDelete({ _id: id[i]._id});
      deletedCategories.push(deleteCategory);
    }
    if(deletedCategories.length == id.length){
res.status(200).json({message:'Categories removed'});



    }else{
        res.status(400).json({message:'Some thing went wrong'});
    }
}

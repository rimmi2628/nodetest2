const models = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
const {db}=require('../models');

const Post=models.Post;
const Like=models.Like;


exports.post=async(req,res)=>{
    try {
        const userid = req.userid; 
        // const user=Like.create({
         
        //     user_id:userid,
        //     post: {
        //       user_id:userid,
        //     post_content:req.body.post_content,
        //     image:req.file.filename,
        //     },
           
        // } ,   
             
        //       {
        //         include:[{model:Post,as:'post'}]
              
        //        });
          
        const user=await Post.create({
         
            post_content:req.body.post_content,
            image:req.file.filename,
            user_id:userid,
         
           });
    
         

        
           res.status(201).json({ sucess: 'ok', data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}


exports.postlike=async(req,res)=>{
    try{
        const userid = req.userid; 
        const {post_id}=req.body;
       const user= await Like.create({
            post_id:post_id,
            user_id:userid
          
           });
           res.status(201).json({ sucess: 'ok', data: user});
           return;
        } 
       
       
            
    catch(error){
        
 
        
        res.status(400).json({error});
    }
}

// exports.getpost=async(req,res)=>{
//     try {
//         const userid = req.userid; 
//         console.log(userid);
//      const post=await Post.findAll({
         
//               include:[{
//                model:Like,
//                attributes:['post_id'],
//                where:{user_id:userid },
            
//                 required:false,
//             }]
//         });
//         res.status(200).json({sucess:'ok',data:post});
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({error});
//     }
// }





exports.getpost = async (req, res) => {
  try {
    // Retrieve the authenticated user's ID from the request object
    const userId = req.userid;

    // Find all posts and include the like information for the authenticated user
    const posts = await Post.findAll({
      include: [{
        model: Like,
        attributes: [
          'post_id',
           [ Sequelize.literal(`CASE WHEN likes.user_id = ${userId} THEN true ELSE false END`),
            'isLike',
          ],
        ],
        required: false,
      }],
    });

    // Return a success response with the retrieved posts
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    // Log and return an error response if an error occurs
    console.error(error);
    res.status(400).json({ success: false, error });
  }
};
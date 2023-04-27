const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = models.User;
require('dotenv').config();




exports.register= async(req,res,next)=>{
    try {
        const {first_name,last_name,email,password}=(req.body);
        const data = await User.findOne({ where: { email: email } });

        // email check
        if (data) {
            res.status(500).json({ message: "email already exsit" });
            return;
        } 

        // hashpassword
        const hashpass = await bcrypt.hash(password, 12);

        // create data
         const user=await User.create({
            first_name:first_name,
            last_name:last_name,
            email:email,
            address:address,
            password:hashpass,
          
         });
        

        

         const payload = {
            id: user.id,
            email: user.email

        }
         const token = jwt.sign(payload, process.env.secretkey, { expiresIn: '12h' });
        
        

    
        
        res.status(200).json({ status: 'sucess', message: 'register successfully...', data: user, token: token });

    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
  
}

exports.userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email:email}});
        console.log(user)
        if(!user){
            res.status(400).json({message:"Invalid email Credential"});
            return;
        }

        const payload = {
            email: user.email,
            id: user.id
        }
        console.log(payload);
                const token = jwt.sign(payload, process.env.secretkey, { expiresIn: '12h' });
                console.log(token);
                const isMatch = await bcrypt.compare(password,user.password);
                console.log(isMatch);
                    if(!isMatch){
                        res.status(400).json({message:'Invalid Credential'});
                        return;
                    }
                    res.status(200).json({success:"ok",msg:"login Successful",data:user,token:token});
                } catch (error) {
                    console.log(e);
                    res.send(400).json({error});
            
                }
            }

          

        


        
   


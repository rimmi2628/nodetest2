const express = require('express');
const router = express.Router();
const UserControllers= require('../controller/UserController');
const PostController=require('../Controller/PostController');
const auth=require('../middelware/auth')
const upload=require('../middelware/multer');
const authvalid=require('../middelware/validation');
const authvalidresult=require('../middelware/validationresult')
router.post('/register',authvalid.registerValidation,authvalidresult,UserControllers.register);
router.post('/login',authvalid.loginvalidation,authvalidresult,UserControllers.userlogin);

router.post('/post' ,auth, upload.single('image'),PostController.post);
router.post('/like',auth,PostController.postlike);
router.get('/getpost',auth,PostController.getpost);
module.exports=router;
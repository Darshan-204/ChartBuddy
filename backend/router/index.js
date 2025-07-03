const express=require("express")
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetail = require("../controller/UserDetail");
const logout = require("../controller/logout");
const updateUserDetail = require("../controller/updateUser");
const searchGetUser = require("../controller/searchGetUser");
const router=express.Router()

//creating the api
   //creating the user register api
      router.post("/register",registerUser);
   //check user email
      router.post("/email",checkEmail);
   //check for password
      router.post("/password",checkPassword);
   //login user detail
      router.get("/user-detail",userDetail); 
   //logout user
      router.get("/logout",logout);
   //update the user detail
      router.post("/update-user",updateUserDetail);
   //seraching the user for start conservation with him
     router.post("/search-user",searchGetUser);


module.exports=router;
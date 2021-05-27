const express = require("express");
const router = express.Router();

const {getUserById,getUser,updateUser,userPurchaseList,pushOrderInPurchaseList} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
// router.get("/users",getAllUsers);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,userPurchaseList);


module.exports= router;
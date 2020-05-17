const express = require("express");
const userController = require("./controller");
const{authenticate,authorize} = require("./../../../middlewares/auth")
const {uploadImage} = require("./../../../middlewares/uploadImage");
const {validateCreateUser} = require("./../../../middlewares/validate/user");


const router = express.Router();

router.post("/login",userController.login);
router.post("/",
    authenticate,
    authorize(["Admin"]),
    validateCreateUser,
    userController.createUser);
router.get("/",
    authenticate,
    authorize(["Admin"]),
    userController.getUsers);
router.delete("/:id",
    authenticate,
    authorize(["Admin"]),
    userController.deleteUserById);
router.put("/:id",
    authenticate,
    authorize(["Admin"]),
    userController.updateUserById);

router.post("/avatar",
    authenticate,
    authorize(["Staff","Admin"]),
    uploadImage("avatar"),
    userController.uploadAvatar)

module.exports=router;
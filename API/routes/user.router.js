import express from 'express';
const router = express.Router();

//to link controller
import * as UserController from '../controller/user.controller.js'; 

router.post("/add",UserController.add);

router.get("/user_retrieve",UserController.fetch);

router.get("/users_list",UserController.list);

router.delete("/delete",UserController.deleteUser);

router.patch("/update",UserController.update);


export default router;



import UserSchemaModel from '../models/user.model.js';

export const add = async (req, res) => {
  var userList = await UserSchemaModel.find();
  var l = userList.length;
  var _id = l == 0 ? 1 : userList[l - 1]._id + 1;

  var userDetails = { ...req.body, "_id": _id };
  try {
    console.log(userDetails)
    await UserSchemaModel.create(userDetails);
    res.status(201).json({ "status": true });
  }
  catch (error) {
    res.status(500).json({ "status": error.message });
  }
};

export const fetch = async (req, res) => {
  var condition_obj = req.query.condition_obj;
  var userList = await UserSchemaModel.find(condition_obj);
  if (userList.length != 0)
    res.status(200).json(userList);
  else
    res.status(404).json({ "status": "Resource not found" });
};

export const list = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const sortBy = req.query.sortBy || "username";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const userList = await UserSchemaModel.find({
      username: { $regex: searchQuery, $options: "i" }
    }).sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalUsers = await UserSchemaModel.countDocuments({
      username: { $regex: searchQuery, $options: "i" }
    });
    if (userList.length !== 0) {
      res.status(200).json({
        data: userList,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      });
    } else {
      res.status(404).json({ "status": "Resource not found" });
    }
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ "status": "Internal Server Error" });
  }
};


export var update = async (req, res) => {
  let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
  if (userDetails) {
    let user = await UserSchemaModel.updateOne(req.body.condition_obj, { $set: req.body.content_obj });
    if (user)
      res.status(200).json({ "msg": "success" });
    else
      res.status(500).json({ "status": "Server Error" });
  }
  else
    res.status(404).json({ "status": "Requested resource not available" });
};

export var deleteUser = async (req, res) => {
  let userDetails = await UserSchemaModel.findOne(req.body);
  console.log(userDetails);
  if (userDetails) {
    let user = await UserSchemaModel.deleteOne(userDetails);
    console.log(user);
    if (user)
      res.status(200).json({ "msg": "success" });
    else
      res.status(500).json({ "status": "Server Error" });
  }
  else
    res.status(404).json({ "status": "Requested resource not available" });
};
const express = require("express");
const {
  addTransection,
  editTransection,
  deleteTransection,
  getAllTransection,
} = require("../controllers/transectioncontroller");

const router = express.Router();

//routers
//addtransectin
router.post("/add-transection", addTransection);
router.post("/edit-transection", editTransection);
router.post("/delete-transection", deleteTransection);

//getting
router.post("/get-transection", getAllTransection);

module.exports = router;

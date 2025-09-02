const express = require("express");
const {
  loginConteroller,
  registerConteroller,
} = require("../controllers/userConteroller");

const router = express.Router();

//routers
//post login
router.post("/login", loginConteroller);
//post register
router.post("/register", registerConteroller);

module.exports = router;

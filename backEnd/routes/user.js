const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get('/patients', userController.getAllPatients)
router.get('', userController.getAllUsers);
router.get(
  "/:id",

  userController.getMedicationOfApatient
);
router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.post('/add', userController.addPatient);


module.exports = router;


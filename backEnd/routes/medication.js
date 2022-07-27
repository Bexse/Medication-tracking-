const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medication')
const userController = require('../controllers/user')

router.get(
  "", userController.middleware,
   medicationController.getAllMedications
); 

router.post(
  "/add",
  userController.middleware,

  medicationController.addMedication
);
router.put("/:id", medicationController.updateMedication);
router.put("/request/:id", medicationController.reillUpdate);
router.get('/:id', userController.middleware,medicationController.getMedicationById);

router.delete(
  "/:id",
  userController.middleware, medicationController.deleteMedication
); 

router.post(
  "/addto/:id",

  medicationController.addMedicationToSPecificPatient
)

module.exports = router; 



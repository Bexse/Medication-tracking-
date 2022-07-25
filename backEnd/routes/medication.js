const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medication')
const userController = require('../controllers/user')

router.get(
  "", userController.middleware,
   medicationController.getAllMedications
); //userController.middleware,

router.post(
  "/add",
  userController.middleware,

  medicationController.addMedication
);//userController.middleware,
router.put("/:id", medicationController.updateMedication);//userController.middleware,
router.put("/request/:id", medicationController.reillUpdate);//userController.middleware,
router.get('/:id', userController.middleware,medicationController.getMedicationById);
;// userController.middleware,
router.delete('/:id', medicationController.deleteMedication); //userController.middleware, 
// to specific patient

router.post(
  "/addto/:id",

  medicationController.addMedicationToSPecificPatient
)

module.exports = router; 



const mongoose = require("mongoose");
const Medication = require("../models/medicationModel");
const User = require("../models/userModel");

exports.getAllMedications = async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "physician") {
    const documents = await Medication.find({}).limit(10).exec();
    res.json({ success: true, data: documents });
  } else {
    const documents = await Medication.find({ user: req.user._id }); // user: req.user._id });
    res.send({ success: true, data: documents });
  }
};

exports.addMedication = async (req, res) => {
  const medicationExist = await Medication.findOne({ _id: req.params.id });
  if (medicationExist) {
    res.status(400).json({ message: "Medication exists" });
  } else {
    const document = await Medication.create({
      ...req.body,
      user: req.user._id,
    });
    res.json({ success: true, data: document });
  }
};

exports.addMedicationToSPecificPatient = async (req, res) => {
  const document = await Medication.create({
    ...req.body,
    user: req.params.id,
  });

  res.json({ success: true, data: document });
};

exports.updateMedication = async (req, res) => {
  const document = await Medication.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json({ success: true, data: document });
};

exports.reillUpdate = async (req, res) => {
  const document = await Medication.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json({ success: true, data: document });
};

exports.deleteMedication = async (req, res) => {
  const document = await Medication.deleteOne({ _id: req.params.id }); // 
  res.json({ success: true, data: document });
};

exports.getMedicationById = async (req, res) => {
  const document = await Medication.findOne({ _id: req.params.id });
  res.json({ success: true, data: document });
};

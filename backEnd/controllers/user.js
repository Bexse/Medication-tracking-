require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const medicationModel = require("../models/medicationModel");
const Medication = require("../models/medicationModel");

exports.login = async (req, res) => {
  const { password } = req.body;

  // Check for user email
  const user = await User.findOne({ email: req.body.email }).lean();
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    const token = jwt.sign({ ...user, password: null }, process.env.SECRET_KEY);
    return res.json({ success: true, data: token });
  }

  res.json({ sucess: false });
};

exports.signUp = async (req, res) => {
  const { email, password, role, phone, firstName, lastName } = req.body;

  if (!email | !password | !role | !firstName | !lastName) {
    res.status(400);
    throw new Error("please add all fields!");
  }
  // check if the users  exist or not.
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });
  res.json({ success: true, data: user });
};

exports.addPatient = async (req, res) => {
  const patientExist = await User.findOne({ _id: req.params.id });
  if (patientExist) {
    res.status(400).json({ message: "patient exists" });
  } else {
    const document = await User.create({
      ...req.body,
    });
    res.json({ success: true, data: document });
  }
};

exports.getMedicationOfApatient = async (req, res) => {
  // const document = await User.findOne({ email: req.query.email }); //user: req.params._id
  // const _id = document._id.toString();

  // console.log(_id);
  //const medications = await Medication.find({ user: _id }); // req.params.id
  const medications = await Medication.find({ user: req.params.id }); // 
  res.json({ success: true, data: medications });
};
exports.getAllPatients = async (req, res) => {
  const documents = await User.find({ role: req.query.role });
  res.json({ success: true, data: documents });
};

exports.getAllUsers = async (req, res) => {
  const documents = await User.find({});
  res.json({ success: true, data: documents });
};

exports.middleware = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead) return res.status(401).json({ message: "no token found" });

  try {
    const token = authHead.split(" ")[1];
    let user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).send("Invalid token");
  }
};
//
exports.roleAuth = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.send("Request is not authorized!");
  }
};

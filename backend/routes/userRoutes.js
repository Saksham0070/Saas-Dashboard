const express = require("express");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const jwtSecret = "TheToughScretKeyForAuthorization";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware for validating inputs
const validateUserInput = [
  body("userEmail").isEmail(),
  body("userName").isLength({ min: 5 }),
  body("userPassword").isLength({ min: 5 }),
];

// Create User Endpoint
router.post(
  "/createuser",
  upload.single("photo"), // Multer handles the file upload
  validateUserInput,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, userEmail, userPassword, specialisation, skillSet, certification, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(userPassword, salt);

    try {
      const photoUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : ""; // Store file path if image is uploaded
      const newUser = await User.create({
        userName,
        userEmail,
        userPassword: secPassword,
        photo: photoUrl,
        role,
        specialisation,
        skillSet: skillSet ? skillSet.split(",") : [], // Convert comma-separated string to array
        certification: certification ? certification.split(",") : [],
      });
      console.log("New User Created:", newUser);
      res.status(201).json({ success: true, message: "User created successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

// Login User Endpoint
router.post(
  "/loginuser",
  [
    body("userEmail").isEmail(),
    body("userPassword").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userEmail, userPassword } = req.body;

    try {
      const userData = await User.findOne({ userEmail });
      if (!userData) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const pwdCompare = await bcrypt.compare(userPassword, userData.userPassword);
      if (!pwdCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const payload = { user: { id: userData.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      console.log("User Logged In");
      res.json({ success: true, authToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);


// Update Profile Endpoint
router.put(
  "/updateProfile",
  upload.single("photo"), // Multer handles the file upload
  async (req, res) => {
    const { userId, userName, userEmail, specialisation, skillSet, certification, role } = req.body;

    try {
      const updates = {
        userName,
        userEmail,
        role,
        specialisation,
        skillSet: skillSet ? skillSet.split(",") : [], // Convert comma-separated string to array
        certification: certification ? certification.split(",") : [], // Convert comma-separated string to array
      };

      if (req.file) {
        // Update photo URL if a new photo is uploaded
        updates.photo = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      }

      // Update the user in the database
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      console.log("User Profile Updated:", updatedUser);
      res.status(200).json({ success: true, message: "Profile updated successfully!", data: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);


// Get Dashboard Data Endpoint
router.get("/getDashboard", async (req, res) => {
  // Extract token from headers
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("The Token from Client = ",token);

  // If no token is found
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Find user based on decoded token data
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return relevant user data for the dashboard
    const dashboardData = {
      userName: user.userName,
      userEmail: user.userEmail,
      role: user.role,
      specialisation: user.specialisation,
      skillSet: user.skillSet,
      certification: user.certification,
      photo: user.photo, // If you want to include photo URL
    };

    res.json({ success: true, data: dashboardData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

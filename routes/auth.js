const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/Users");

// GET /login page

router.get("/login", (req, res) => {
res.sendFile(path.join(__dirname, "../public/login.html"));
});

// GET /register page
router.get("/register", (req, res) => {
res.sendFile(path.join(__dirname, "../public/register.html"));
});

// POST /register
// aids in making a user account
router.post("/register", async (req, res) => {
try {
const { username, password, confirmPassword } = req.body;

//if block makes sure that the username and password feilds are filled in
if (!username || !password || !confirmPassword) {
return res.status(400).send("All fields are required.");
}

if (password !== confirmPassword) {
return res.status(400).send("Passwords do not match.");
}

//this if block checks if the username typed in is already taken or not
const existing = await User.findOne({ username });
if (existing) {
return res.status(400).send("Username already taken.");
}

//hashes password before saving
const hashed = await bcrypt.hash(password, 10);

//creates new user in mongo db
const user = await User.create({
username,
password: hashed,
});
// Log the user in by saving info in the session
req.session.user = { id: user._id, username: user.username };

//redirect to home page
res.redirect("/");
} catch (err) {
console.error("Register error:", err);

res.status(500).send("Something went wrong.");
}
});

// POST /login
router.post("/login", async (req, res) => {
try {
const { username, password } = req.body;
//both username and password are required and must be inputted
if (!username || !password) {
return res.status(400).send("Both fields required.");
}
//look for the user in database
const user = await User.findOne({ username });
if (!user) {
return res.status(400).send("Invalid login.");
}
//compares entered password to already hashed one
const match = await bcrypt.compare(password, user.password);
//if it already exists input this error messagee
if (!match) {
return res.status(400).send("Invalid login.");
}
// Save login info into the session
req.session.user = { id: user._id, username: user.username };

res.redirect("/");
//redirect to the home page
} catch (err) {
console.error("Login error:", err);
res.status(500).send("Something went wrong.");
}
});

// POST /logout
//end the session
router.post("/logout", (req, res) => {
req.session.destroy(() => {
res.redirect("/login");
});
});

// GET /auth/status (for nav bar)
router.get("/auth/status", (req, res) => {
const loggedIn = !!req.session.user;
res.json({ loggedIn });
});

module.exports = router;

// GET /change-password page
router.get("/change-password", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.sendFile(path.join(__dirname, "../public/change-password.html"));
});

// POST /change-password
router.post("/change-password", async (req, res) => {
  try {
    if (!req.session.user) return res.redirect("/login");

    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).send("All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send("New passwords do not match.");
    }

    // Load user
    const user = await User.findById(req.session.user.id);
    if (!user) return res.status(400).send("User not found.");

    // Confirm current password
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).send("Current password is incorrect.");

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // Update in database
    user.password = hashed;
    await user.save();

    res.send("Password updated successfully!");
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).send("Something went wrong.");
  }
});

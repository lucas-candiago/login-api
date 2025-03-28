const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const verifyToken = require("../middlewares/authMiddlewares"); // Import verifyToken middleware

const router = express.Router()

// register endpoint
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ message: "Email already registered" })

        const hashedPassword = await bcrypt.hash(password, 10)   // encrypting password before saving it to the database
        const newUser = new User({ name, email, password: hashedPassword })

        await newUser.save()  // saving the new user to the database
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})

// login endpoint 
router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, user.password)  // verifying if the encrypted password matches the password in the database
        if (!isMatch) return res.status(400).json({ message: "Password does not match" })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })  // setting jwt token for 1 hour (if you want more time, change in expiresIn)

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
    }
    catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})


// change password endpoint
router.patch("/change-password", verifyToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body

    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "User not found" })

        const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password)  // verifying if old password is correct
        if (!oldPasswordMatch) return res.status(400).json({ message: "Old password does not match" })

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedNewPassword

        await user.save()
        res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})

// chanck token endpoint
router.get("/check", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not allowed" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// list all users endpoint
router.get("/all-users", verifyToken, async (req, res) => {
    try {
        const usersObjects = await User.find()
        
        const users = []
        
        usersObjects.map(user => {
            users.push({ name: user.name, email: user.email, id: user.id })
        })

        res.status(200).json({ users })
    } catch (error) {
        res.status(404).json({ message: "Server error" })
    }
})

module.exports = router;
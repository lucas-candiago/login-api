const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User")

const router = express.Router()

// Endpoint de registro
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ message: "Email já registrado" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword })

        await newUser.save()
        res.status(201).json({ message: "Usuário criado com sucesso!" })
    } catch (error) {
        res.status(500).json({ message: "Erro no server" })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Usuário não encontrado" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Senha incorreta!" })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
    }
    catch (error) {
        res.status(500).json({ message: "Erro no server" })
    }
})


module.exports = router;
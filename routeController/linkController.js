require('dotenv').config

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const User = require('../models/User')

const createUser = async(req, res) => {

    const { username, password, confirmpassword, email, age } = req.body

    if(!email) return res.status(422).json({ msg: 'Insira um email válido!' })
    if(!password) return res.status(422).json({ msg: 'A senha é obrigatória!' })
    if(!confirmpassword) return res.status(422).json({ msg: 'Confirme sua senha por favor!' })
    if(!username) return res.status(422).json({ msg: 'O nome de usuário obrigatório!' })
    if(!age) return res.status(422).json({ msg: 'Insira sua idade!' })

    if(password != confirmpassword) return res.status(422).json({ msg: 'As senhas são difierentes!' })

    const emailUse = await User.findOne({ email: email })
    const userNameUse = await User.findOne({ username: username })
    
    if(emailUse) return res.status(422).json({ msg: 'O email digitado já está em uso! Tente outro' })
    if(userNameUse) return res.status(422).json({ msg: 'O nome de usuário já esta em uso! Tente outro' })

    const salt = await bcrypt.genSalt(14)
    const passwordCript = await bcrypt.hash(password, salt)

    const user = new User({ username, password: passwordCript, confirmpassword: passwordCript, email, age })

    try {
        
        user.save()
        res.status(200).json({ msg: 'Usuário criado com sucesso! Seja Bem-Vindo ao portal do Usuário' })

    } catch (error) {
        
        console.log(error)

    }

}

const loginUser = async (req, res) => {

    

}

module.exports = { createUser }
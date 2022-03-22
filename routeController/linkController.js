require('dotenv').config

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const User = require('../models/User')

const createUser = async(req, res) => {

    const { username, password, confirmpassword, email, age } = req.body

    if(!email || !password || !confirmpassword || !username || !age){
        return res.status(422).json({ msg: 'Preencha todos os campos para finalizar o cadastro' })
    }

    if(password != confirmpassword) return res.status(422).json({ msg: 'A senhas são diferentes' })

    if(age < 18) return res.status(422).json({ msg: 'O sistema é para maiores de idade' })

    const emailUse = await User.findOne({ email: email })
    const userNameUse = await User.findOne({ username: username })
    
    if(emailUse){
        return res.status(422).json({ msg: 'O email digitado já está em uso! Tente outro' })
    }else if(userNameUse){
        return res.status(422).json({ msg: 'Este nome já está em uso! Tente outro' })
    }

    const salt = await bcrypt.genSalt(14)
    const passwordCript = await bcrypt.hashSync(password, salt)

    const user = new User({ username, password: passwordCript, confirmpassword: passwordCript, email, age })

    const token = await jwt.sign({ email: user.email, user: user.username }, process.env.SECRET)
    const verifyToken = jwt.verify(token, process.env.SECRET)

    console.log(verifyToken)

    try{
       user.save()
       res.status(200).json({ msg: 'Usuário criado com sucesso! Seja Bem-Vindo ao portal do usuário' })
    } catch(error){
        console.log(error)
        res.status(500).json({ msg: '[ERROR - 500] - Houve um erro no servidor! Tente novamente mais tarde' })
    }

}

const loginUser = async (req, res) => {

    const { email, password } = req.body

    if(!email || !password) return res.status(200).json({ msg: 'Preencha todos os campos por favor!' })

    const user = await User.findOne({ email: email })

    if(!user) res.status(404).json({ msg: 'Senha ou Email incorretos!' })

    const verificaPassword = await bcrypt.compare(password, user.password)
    
    if(verificaPassword == false){
        res.status(422).json({ msg: 'Senha ou Email incorretos!' })
    }else{
        res.status(200).json({ msg: 'Seja Bem-Vindo(a) ao portal do usuário!' })
    }
    
}

module.exports = { createUser, loginUser }
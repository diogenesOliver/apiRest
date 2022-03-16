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
        return res.status(422).json({ msg: 'Preencha todos os campos por favor!' })
    }

    if(password != confirmpassword) return res.status(422).json({ msg: 'As senhas são difierentes!' })

    if(age < 18) return res.status(422).json({ msg: 'O sistema é para maiores de idade!' })

    const emailUse = await User.findOne({ email: email })
    const userNameUse = await User.findOne({ username: username })
    
    if(emailUse){
        return res.status(422).json({ msg: 'O email digitado já está em uso! Tente outro' })
    }else if(userNameUse){
        return res.status(422).json({ msg: 'O nome de usuário já esta em uso! Tente outro' })
    }

    const salt = await bcrypt.genSalt(14)
    const passwordCript = await bcrypt.hash(password, salt)

    const user = new User({ username, password: passwordCript, confirmpassword: passwordCript, email, age })

    try{
       user.save()
       res.status(200).json({ msgs: 'Usuário criado com sucesso! Seja Bem-Vindo ao portal do usuário!' }) 
    } catch(error){
        console.log(error)
        res.status(500).json({ msg: '[ERROR - 500] - Ocorreu um erro no servidor! Tente novamente mais tarde' })
    }

}

const loginUser = async (req, res) => {

    

}

module.exports = { createUser }
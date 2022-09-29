const {
    deleteUser,
    getAllUsers,
    getUser,
    registerUser,
    updateUser} = require('../controllers/users')
const express = require('express')

const Router = express()

Router.route('/user/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

Router.route('/register').post(registerUser)
Router.route('/allUsers').get(getAllUsers)

module.exports =  Router
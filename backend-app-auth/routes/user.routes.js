const express = require('express')
const router = express.Router()
const {
    createUser,
    loginUser,
    deleteUserById,
    updateUser,
    getUserById,
    getAllUsers
} = require('./../controllers/user.controller')
const users = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')
const validateJWT = require('../middlewares/validateJWT');


router.post('/register', users, validateFields, createUser)
router.post('/login', loginUser)
router.get('/get-user/:id', getUserById);
router.put('/update-user/:id', validateJWT, updateUser);
router.get('/get-users', validateJWT, getAllUsers);
router.delete('/delete-user/:id', validateJWT, deleteUserById);

module.exports = router
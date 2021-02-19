const router = require('express').Router()
const AuthController = require('../controllers/Auth')
const AuthRequest = require('../requests/Auth')

router.post('/register', AuthRequest.register, AuthController.register)
router.post('/login', AuthRequest.login, AuthController.login)

module.exports = router
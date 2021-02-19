const router = require('express').Router()

// put your api routes here
router.use('/auth', require('./Auth'))


module.exports = router
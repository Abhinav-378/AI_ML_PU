const express = require("express")
const {home, getPatients, setPatients} = require('../controllers/patientControllers.js')

const router = express.Router()
router.get("/", home)
router.get('/emergency',getPatients);
router.post('/emergency', setPatients);

module.exports = router
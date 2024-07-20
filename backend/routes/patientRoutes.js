const express = require("express");
const { home, getPatients, setPatients, signup, signin } = require('../controllers/patientControllers.js');

const router = express.Router();

router.get("/", home);
router.get('/emergency', getPatients);
router.post('/emergency', setPatients);
router.post('/signup', signup);
router.post('/signin', signin); 

module.exports = router;

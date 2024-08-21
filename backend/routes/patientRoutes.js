const express = require("express");
const { home, getPatients, setPatients, signup, signin, deletePatient } = require('../controllers/patientControllers.js');

const router = express.Router();

router.get("/", home);
router.get('/emergency', getPatients);
router.post('/emergency', setPatients);
router.delete('/emergency/:id', deletePatient);
router.post('/signup', signup);
router.post('/signin', signin); 

module.exports = router;

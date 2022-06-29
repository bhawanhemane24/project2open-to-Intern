const express = require("express")
const router = express.Router(); 


const collegeController = require('../Controller/CollegeController')
const InternController = require('../Controller/InternController')

router.post('/functionup/colleges', collegeController.colleges)
router.post('/functionup/interns', InternController.interns)
router.get('/functionup/collegeDetails', collegeController.collegeDetails)


module.exports = router
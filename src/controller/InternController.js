const AuthorModel = require('../../../faizan/all projects/SimpleBlogSite/src/Model/AuthorModel')
const { findOne } = require('../Model/CollegeModel')
const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')
 const mongoose = require('mongoose')

const isValidEmail = function (value) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
  else return false
}
const isValidMobile = function (value) {
  if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) { return true }
  else return false
}
const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};


const interns = async function (req, res) {
  // try {
    let data = req.body
    let {name,email,mobile,collegeId} = data

    if (Object.keys(data).length ===  0) return res.status(400).send({ status: false, msg: "Please fill the required" })

    if (!name) return res.status(400).send({ status: false, msg: "Name is required" })

    if (!email) return res.status(400).send({ status: false, msg: "Email is required" })

    if (!mobile) return res.status(400).send({ status: false, msg: "Mobile number is required" })

    if (!collegeId) return res.status(400).send({ status: false, msg: "College Id is required" })

    // if(!data.collegeName) return res.status(400).send({status:false,msg: "College Id is required"})
    if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Email is not valid" })

    if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "Mobile Number is not valid" })
   
    // if(!isValidObjectId(data.college_Id)) return res.status(400).send({ status: false, msg: "Not a valid College Id" })
   

    const Id = await CollegeModel.findOne(collegeId)/// 
    if(!Id)return res.status(400).send({ status: false, msg: "College id is not valid" })

    const mob = await InternModel.findOne({ mobile})
    if(mob)return res.status(409).send({ status: false, msg: "Existing Mobile NUmber" }) // 409 is for duplicate existing

   const mail = await InternModel.findOne({ email })
   if(mail)return res.status(400).send({ status: false, msg: "Existing Email" })

 
    const createdData = await InternModel.create(data)
    return res.status(201).send({ status: true, data: createdData })
//   } catch (error) {
//     res.status(500).send({ msg: error.message })
//   }
}

module.exports.interns = interns
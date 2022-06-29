const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')


const interns = async function (req, res) {
  try{
    let data = req.body

    if(!data.name) return res.status(400).send({status:false,msg: "Name is required"})

    if(!data.email) return res.status(400).send({status:false,msg: "Email is required"})

    if(!data.mobile) return res.status(400).send({status:false,msg: "Mobile number is required"})

    if(!data.college_Id) return res.status(400).send({status:false,msg: "College Id is required"})

    // if(!data.collegeName) return res.status(400).send({status:false,msg: "College Id is required"})

    if (!Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please fill the required" })

    const createdData = await InternModel.create(data)
    res.status(201).send({ status: true, data: createdData })
  } catch(error) {
      res.status(500).send({msg: error.message})
  }
}

module.exports.interns = interns
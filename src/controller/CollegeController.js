const CollegeModel = require('../Model/CollegeModel')


const colleges = async function (req, res) {
  try{
    let data = req.body

    if(!data.name) return res.status(400).send({status:false,msg: "Name is required"})

    if(!data.fullName) return res.status(400).send({status:false,msg: "Fullname is required"})

    if(!data.logoLink) return res.status(400).send({status:false,msg: "Logo is required"})

    if (!Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please fill the required" })
    
    const createdData = await CollegeModel.create(data)
    res.status(201).send({ status: true, data: createdData })
} catch(error) {
    res.status(500).send({msg: error.message})
}

}

const collegeDetails = async function (req, res) {
 try{
    let data = req.query

    if(!data.name) return res.status(400).send({status:false,msg: "Name is required"})

    if(!data.fullName) return res.status(400).send({status:false,msg: "FullName is required"})

    // if(!data.logoLink) return res.status(400).send({status:false,msg: "College Id is required"})

    if (!Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please fill the required" })

    const getCollegeDetails = await CollegeModel.find(data)
    res.status(201).send({status:true, msg: getCollegeDetails })
} catch(error) {
    res.status(500).send({msg: error.message})
}

}

module.exports.colleges = colleges
module.exports.collegeDetails = collegeDetails
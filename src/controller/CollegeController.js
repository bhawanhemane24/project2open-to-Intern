const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')

const isValidUrl = function (value) {
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value)

}
// const isValidName = function (value) {
//     return (/^[a-zA-Z]{2,20}$/.test(value.trim()))

//   }
function hasLowerCase(str) {
    (/[a-z]/.test(str));
}


const colleges = async function (req, res) {
    try {
        let data = req.body
        let { name, fullName, logoLink } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Fill all the college requirement" })

        if (!(name)) return res.status(400).send({ status: false, msg: "Name is required" })

        if (!fullName) return res.status(400).send({ status: false, msg: "Fullname is required" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "Logo link is required" })

        const findName = await CollegeModel.findOne({ name })
        if (findName) return res.status(400).send({ status: false, msg: "Exiting college Name try different" })

        const createdData = await CollegeModel.create(data)
        return res.status(201).send({ status: true, data: createdData })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

const collegeDetails = async function (req, res) {
    try {
        let name = req.query.collegeName    // collecting request from query
        if (name) {
            let college = await CollegeModel.findOne({ name: name, isDeleted: false }) // db call for finding collge
            if (!college)                                                              // validation for colllege is available or not
            {
                res.status(404).send({ status: false, msg: "College not found" })
            }
            else                                                                    // if college is available it retrive data from DB
            {
                let collegeData = {
                    name: college.name,
                    fullName: college.fullName,
                    logolink: college.logoLink
                }
                // db call for available interns in that particular college
                let interns = await InternModel.find({ collegeId: college._id, isDeleted: false })
                console.log(interns)
                if (interns.length > 0)                                               // if interns available, it returns data in array format.
                {
                    collegeData.interns = interns
                }
                res.status(200).send({ status: true, data : collegeData })
            }
        } else {                                                                    // validation for empty request in query
            res.status(400).send({ status: false, msg: "College name required" })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.colleges = colleges
module.exports.collegeDetails = collegeDetails
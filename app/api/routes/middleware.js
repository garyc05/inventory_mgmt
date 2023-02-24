const { Staff } = require('../models')

// Middleware function to perform basic staff validations for every request
// If the function does not return a response itself then the valid staffMember object is passed to the next function via res.locals
const staffValidator = async (req, res, next) => {
  try {
    const staffId = req.body?.staff_id || req.query?.staff_id

    if(!staffId){ 
      return res.status(422).send({ message: 'staff_id is a required value' })
    }

    const staffMember = await Staff.findByPk(staffId)

    if(!staffMember){ 
      return res.status(400).send({ message: `This may trigger an existential crisis, but it appears you don't even exist staff number ${staffId}` })
    }

    const staffMemberLocations = await staffMember.getLocations()
    const worksAtLocation = staffMemberLocations.some((location) => location.id == process.env.LOCATION_ID)

    if(!worksAtLocation){
      return res.status(400).send({ message: `${staffMember.name} does not work at Location ${process.env.LOCATION_ID}` })
    }

    res.locals.staffMember = staffMember
    next()

  } catch(err){
    console.log('Error In Staff Validation Middleware', err)
    return res.sendStatus(500)
  }
}


module.exports = { staffValidator }
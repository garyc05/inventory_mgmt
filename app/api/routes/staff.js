const { sequelize } = require('../models')

const LOCATION_ID = process.env.LOCATION_ID


module.exports = () => {
  const router = require('express-promise-router')()
  router.get('/', getLocationStaff)
  return router
}

const getLocationStaff = async (req, res, next) => {
  const query = `
  select * from staff s
	  join staff_locations sl 
	    on s.id = sl.staff_id
	  join staff_roles sr 
	    on s.id = sr.staff_id
	  join roles r 
	    on sr.role_id = r.id
    where sl.location_id = ${LOCATION_ID}
  `

  const [result,_] = await sequelize.query(query)

  res.send(result)
}
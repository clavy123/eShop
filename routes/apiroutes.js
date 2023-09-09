const express = require('express')
const routes = express.Router()
const{getApi,postApi,updateApi,deleteApi,getAllApi} = require('../controllers/apicontroller')

routes.route('/all').get(getAllApi)
routes.route('/').get(getApi)
routes.route('/api').post(postApi)
routes.route('/api/:id').put(updateApi)
routes.route('/api/:id').delete(deleteApi)

module.exports = routes
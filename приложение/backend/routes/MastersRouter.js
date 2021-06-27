const express = require('express')
const MastersService = require('../services/MastersService')
const passport = require('passport')
const ResponseResult = require('../common/ResponseResult')

const MastersRouter = express.Router()

MastersRouter.get('/', async (req, res) => {
  const result = await MastersService.retrieveAllMasters()

  ResponseResult(result, res)
})

MastersRouter.post('/like', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { _id } = req.body
  const { user } = req

  if (!user) {
    ResponseResult({ errors: 'Unauthorized'}, res)
    return
  }

  const result = await MastersService.likeMaster(_id, user)

  ResponseResult(result, res)
})

MastersRouter.post('/add',  passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user } = req
  const data = req.body

  if (user.role !== 'admin') {
    ResponseResult({ message: 'Unauthorized', status: 400 }, res)
    return
  }

  const result = await MastersService.addMaster(data)

  ResponseResult(result, res)
})




// ApplicationRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   const result = await ApplicationService.loadApplications()

//   ResponseResult(result, res)
// })

// ApplicationRouter.get('/my', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   const { userName } = req.user
//   const result = await ApplicationService.loadMyApplications(userName)

//   ResponseResult(result, res)
// })

// ApplicationRouter.get('/pending', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   const result = await ApplicationService.loadPendingApplications()

//   ResponseResult(result, res)
// })

// ApplicationRouter.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   const { applicationId, ...restApplicationData } = req.body

//   const result = await ApplicationService.updateApplication(applicationId, restApplicationData)

//   ResponseResult(result, res)
// })

// ApplicationRouter.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   console.log(req.body)
//   const { applicationId } = req.body

//   const result = await ApplicationService.deleteApplication(applicationId)

//   ResponseResult(result, res)
// })

module.exports = MastersRouter

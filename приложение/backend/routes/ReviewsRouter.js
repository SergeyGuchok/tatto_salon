const express = require('express')
const ReviewsService = require('../services/ReviewsService')
const passport = require('passport')
const ResponseResult = require('../common/ResponseResult')

const ReviewsRouter = express.Router()

ReviewsRouter.get('/', async (req, res) => {
  const result = await ReviewsService.retrieveAllReviews()

  ResponseResult(result, res)
})

ReviewsRouter.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const data = req.body
  const { user } = req

  if (!user) {
    ResponseResult({ errors: 'Unauthorized'}, res)
    return
  }

  const result = await ReviewsService.addReview(data)

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

module.exports = ReviewsRouter

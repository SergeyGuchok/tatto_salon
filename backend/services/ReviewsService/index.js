const MongoClient = require('../../MongoClient')
const ResponseStatusTypes = require('../../common/ResponseStatusTypes')

const SOMETHING_WENT_WRONG = 'Something went wrong'

class ReviewsService {
  createResponse = (errors, status, message) => ({
    errors,
    status,
    message
  })

  getReviewsCollection = async () => {
    const db = await MongoClient.db('tattoo')
    return await db.collection('reviews')
  }

  retrieveAllReviews = async () => {
    try {
      const reviewsCollection = await Service.getReviewsCollection()

      const reviews = await reviewsCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        reviews: reviews.reverse()
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  addReview = async (data) => {
    try {
      const reviewsCollection = await Service.getReviewsCollection()
      await reviewsCollection.insertOne({
        ...data,
      })

      const reviews = await reviewsCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        reviews: reviews.reverse()
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  // deleteUser = async (userName) => {
  //   try {
  //     const newsCollection = await Service.getNewsCollection()
  //     console.log(userName)
  //     await newsCollection.deleteOne({
  //       userName
  //     })

  //     return Service.createResponse(null, ResponseStatusTypes.OK, {
  //       message: 'User was deleted'
  //     })
  //   } catch (e) {
  //     console.log(e)
  //     return Service.createResponse(e, ResponseStatusTypes.FAIL, {
  //       message: SOMETHING_WENT_WRONG
  //     })
  //   }
  // }

  // getNewById = async (userName) => {
  //   try {
  //     const newsCollection = await Service.getNewsCollection()

  //     const item = await newsCollection.findOne({ userName })

  //     if (item) {
  //       return Service.createResponse(null, ResponseStatusTypes.OK, {
  //         item: item
  //       })
  //     }

  //     return Service.createResponse(null, ResponseStatusTypes.FAIL, {
  //       item: null
  //     })
  //   } catch (e) {
  //     console.log(e)
  //     return Service.createResponse(e, ResponseStatusTypes.FAIL, {
  //       message: SOMETHING_WENT_WRONG
  //     })
  //   }
  // }
}

const Service = new ReviewsService()

module.exports = Service

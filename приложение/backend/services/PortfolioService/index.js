const MongoClient = require('../../MongoClient')
const ResponseStatusTypes = require('../../common/ResponseStatusTypes')

const SOMETHING_WENT_WRONG = 'Something went wrong'

class PortfolioService {
  createResponse = (errors, status, message) => ({
    errors,
    status,
    message
  })

  getPortfolioCollection = async () => {
    const db = await MongoClient.db('tattoo')
    return await db.collection('portfolio')
  }

  retrieveAllPortfolio = async () => {
    try {
      const portfolioCollection = await Service.getPortfolioCollection()

      const items = await portfolioCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        items: items.reverse()
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  addPortfolio = async (data) => {
    try {
      const portfolioCollection = await Service.getPortfolioCollection()

      await portfolioCollection.insertOne(data)

      const items = await portfolioCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        items: items.reverse()
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

const Service = new PortfolioService()

module.exports = Service

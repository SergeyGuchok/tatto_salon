const MongoClient = require('../../MongoClient')
const ResponseStatusTypes = require('../../common/ResponseStatusTypes')
const { ObjectId } = require('bson')

const SOMETHING_WENT_WRONG = 'Something went wrong'

class MastersService {
  createResponse = (errors, status, message) => ({
    errors,
    status,
    message
  })

  getMastersCollection = async () => {
    const db = await MongoClient.db('tattoo')
    return await db.collection('masters')
  }

  getUsersCollection = async () => {
    const db = await MongoClient.db('tattoo')
  }

  addMaster = async (data) => {
    try {
      const mastersCollection = await Service.getMastersCollection()
      mastersCollection.insertOne({
        ...data,
        likes: 0,
        likedBy: []
      })

      const masters = await mastersCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        masters: masters.reverse()
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  retrieveAllMasters = async () => {
    try {
      const mastersCollection = await Service.getMastersCollection()

      const masters = await mastersCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        masters: masters.reverse()
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  likeMaster = async (masterId, user) => {
    try {
      const mastersCollection = await Service.getMastersCollection()
      let masters = await mastersCollection.find().toArray()
      const { likedBy } = await mastersCollection.findOne({ _id: ObjectId(masterId) })

      if (likedBy.includes(user.login)) {
        return Service.createResponse(null, ResponseStatusTypes.OK, {
          masters: masters.reverse()
        })
      }

      const newLikedBy = [...likedBy, user.login]

      mastersCollection.updateOne({ _id: ObjectId(masterId) }, { $inc: { likes: +1 }, $set: { likedBy: newLikedBy } })
      masters = await mastersCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        masters: masters.reverse()
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  // deletMaster = async (userName) => {
  //   try {
  //     const mastersCollection = await Service.getMastersCollection()
  //     console.log(userName)
  //     await mastersCollection.deleteOne({
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

  // getMasterById = async (userName) => {
  //   try {
  //     const mastersCollection = await Service.getMastersCollection()

  //     const item = await mastersCollection.findOne({ userName })

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

const Service = new MastersService()

module.exports = Service

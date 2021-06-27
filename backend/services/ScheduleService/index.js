const MongoClient = require('../../MongoClient')
const ResponseStatusTypes = require('../../common/ResponseStatusTypes')

const SOMETHING_WENT_WRONG = 'Something went wrong'

class ScheduleService {
  createResponse = (errors, status, message) => ({
    errors,
    status,
    message
  })

  getScheduleCollection = async () => {
    const db = await MongoClient.db('tattoo')
    return await db.collection('schedules')
  }

  getUsersCollection = async () => {
    const db = await MongoClient.db('tattoo')
    return await db.collection('users')
  }

  retrieveAllSchedules = async () => {
    try {
      const schedulesCollection = await Service.getScheduleCollection()

      const schedules = await schedulesCollection.find().toArray()
      return Service.createResponse(null, ResponseStatusTypes.OK, {
        schedules
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  addSchedule = async (data, userData) => {
    try {
      const schedulesCollection = await Service.getScheduleCollection()
      const usersCollection = await Service.getUsersCollection()

      const result = await schedulesCollection.insertOne(data)
      const { schedules } = await usersCollection.findOne({ login: userData.login })
      await usersCollection.updateOne({ login: userData.login }, { $set : { schedules: [...schedules, result.insertedId] }})

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        success: true,
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

const Service = new ScheduleService()

module.exports = Service

import apiMap from "../API/apiMap"
import { apiGet, apiPost } from '../API/apiRequest'

class SchedulesService {
  getSchedules = () => apiGet(apiMap.schedules())
  addSchedule = (data) => apiPost(apiMap.schedules.add(), data)
}

export default new SchedulesService()
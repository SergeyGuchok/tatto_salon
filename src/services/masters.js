import apiMap from "../API/apiMap"
import { apiGet, apiPost } from '../API/apiRequest'

class MastersService {
  addMaster = (data) => apiPost(apiMap.masters.add(), data)
  getMasters = () => apiGet(apiMap.masters())
  likeMaster = (_id) => apiPost(apiMap.masters.like(), { _id })
}

export default new MastersService()
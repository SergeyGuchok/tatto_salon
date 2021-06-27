import apiMap from "../API/apiMap"
import { apiGet, apiPost, apiPut, apiDelete } from '../API/apiRequest'

class NewsService {
  addPortfolio = (data) => apiPost(apiMap.portfolio.add(), data)
  getPortfolio = () => apiGet(apiMap.portfolio())
}

export default new NewsService()
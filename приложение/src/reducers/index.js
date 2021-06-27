import { combineReducers } from "redux";
import userReducer from './user'
import applicationsReducer from './applications'
import newsReducer from './news'
import portfolioReducer from './portfolio'
import mastersReducer from './masters'
import reviewsReducer from './reviews'
import schedulesReducer from './schedules'

const createReducer = () => combineReducers({
  user: userReducer,
  applications: applicationsReducer,
  news: newsReducer,
  portfolio: portfolioReducer,
  masters: mastersReducer,
  reviews: reviewsReducer,
  schedules: schedulesReducer,
})

export default createReducer

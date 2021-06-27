const initialState = []

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_SCHEDULES':
      return [...action.payload]

    default:
      return state
  }
}

export default reviewsReducer
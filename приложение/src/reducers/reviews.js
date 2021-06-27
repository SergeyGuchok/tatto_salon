const initialState = []

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_REVIEWS':
      return [...action.payload]

    default:
      return state
  }
}

export default reviewsReducer
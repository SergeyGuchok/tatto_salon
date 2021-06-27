const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_NEWS':
      return [...action.payload]

    default:
      return state
  }
}

export default userReducer
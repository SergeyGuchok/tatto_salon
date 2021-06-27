const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_MASTERS':
      return [...action.payload]

    default:
      return state
  }
}

export default userReducer
const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_INFO':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export default userReducer
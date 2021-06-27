const initialState = []

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_APPLICATIONS':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default applicationsReducer
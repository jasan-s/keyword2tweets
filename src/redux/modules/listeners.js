const ADD_LISTENER = 'ADD_LISTENER'

// /////////////Listeners Actions
export function addListener (listenerId) {
  return {
    type: ADD_LISTENER,
    listenerId
  }
}

// //////////////////Listeners Reducers

export default function listeners (state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER :
      return {...state, [action.listenerId]: true}
    default :
      return state
  }
}
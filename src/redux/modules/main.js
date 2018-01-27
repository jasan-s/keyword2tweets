export const REHYDRATE_COMPLETE = 'REHYDRATE_COMPLETE'
export const FETCHING_PENDING = 'FETCHING_PENDING'
export const FETCHING_FULFILLED = 'FETCHING_FULFILLED'
export const FETCHING_REJECTED = 'FETCHING_REJECTED'
export const LOGGING_OUT = 'LOGGING_OUT' // so listen to it in index.js to reset entire redux store to intial state all in one go instead of resseting it at each reducer


export function setRehydrateCompleteFlag() {
  return {
    type: REHYDRATE_COMPLETE,
  }
}

export function setFetchingStart() {
  return {
    type: FETCHING_PENDING,
  }
}

export function setFetchingSuccess() {
  return {
    type: FETCHING_FULFILLED,
  }
}

export function setFetchingError() {
  return {
    type: FETCHING_REJECTED,
  }
}

// triggers the state ='undefined' in the main index.js file
export function loggingOut() {
  return {
    type: LOGGING_OUT,
  }
}

const initialState = {
  fetching: false,
  rehydrationComplete: false,
}

export default function main(state = initialState, action) {
  switch (action.type) {
    case FETCHING_PENDING:
      return {
        ...state,
        fetching: true,
      }
    case FETCHING_FULFILLED:
    case FETCHING_REJECTED:
      return {
        ...state,
        fetching: false,
      }
    case REHYDRATE_COMPLETE:
      return {
        ...state,
        rehydrationComplete: true,
      }
    default:
      return state
  }
}


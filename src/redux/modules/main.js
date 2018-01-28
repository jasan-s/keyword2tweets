import {fetchTweetsGivenKeyword, saveSearchedKeywordtoFirebase, listenToKeywords} from 'helpers/api'
import { addListener } from 'redux/modules/listeners'

export const REHYDRATE_COMPLETE = 'REHYDRATE_COMPLETE'
export const FETCHING_PENDING = 'FETCHING_PENDING'
export const FETCHING_FULFILLED = 'FETCHING_FULFILLED'
export const FETCHING_REJECTED = 'FETCHING_REJECTED'
export const LOGGING_OUT = 'LOGGING_OUT' // so listen to it in index.js to reset entire redux store to intial state all in one go instead of resseting it at each reducer
export const SAVE_TWEETS_DATA = 'SAVE_TWEETS_DATA'
export const SET_ERROR = 'SET_ERROR'
const SET_CURRENT_KEYWORD = 'SET_CURRENT_KEYWORD'
const SAVE_KEYWORDS = 'SAVE_KEYWORDS'
const SAVE_KEYWORD_ID_LIST = 'SAVE_KEYWORD_ID_LIST'

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

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  }
}
// triggers the state ='undefined' in the main index.js file
export function loggingOut() {
  return {
    type: LOGGING_OUT,
  }
}

export function saveTweetsData(keyword, tweetsData) {
  return {
    type: SAVE_TWEETS_DATA,
    keyword,
    tweetsData,
  }
}

export function setCurrentKeyword(keyword, timeSearched) {
  return {
    type: SET_CURRENT_KEYWORD,
    keyword,
    timeSearched,
  }
}

export function saveKeywords(keywords) {
  return {
    type: SAVE_KEYWORDS,
    keywords,
  }
}

export function saveKeywordIdList(keywordIdList) {
  return {
    type: SAVE_KEYWORD_ID_LIST,
    keywordIdList,
  }
}


// /// THUNKS

export function handlefetchingTweetsGivenKeyword(keyword, recent=false) {
  return async (dispatch, getState) => {
    // incase the currentKeyword is the same as incoming keyword && it has been less than 1 minute return without fetching from Twitter
    keyword = keyword.trim().toLowerCase()
    if(getState().main.currentKeyword === keyword) {
        const timeNow = Date.now()
        const timeElapsed = timeNow - getState().main.currentKeywordTimeSearched
        if(timeElapsed <= 60000) {
          return
        }
    }
    dispatch(setFetchingStart())
    try {
      const result = await fetchTweetsGivenKeyword(keyword)
      dispatch(saveTweetsData(result.data.keyword, result.data.tweetsData.statuses))
      const timeNow = Date.now()
      dispatch(setCurrentKeyword(result.data.keyword, timeNow))
      dispatch(setFetchingSuccess())
      if(!recent) {
        saveSearchedKeywordtoFirebase(result.data.keyword)
      }
      process.env.NODE_ENV === 'production' ? null : console.log('tweets Data Succecsfully fecthed from twitter')
      return
    } catch (error) {
      process.env.NODE_ENV === 'production' ? null : console.log('tweets Data fetch Error Occured: ', error)
      dispatch(setError(error))
      dispatch(setFetchingError())
      return false
    }
  }
}

export function setKewordsListener () {
  return (dispatch, getState) => {
    if (getState().listeners[`keywords`] === true) {
      return
    }
    dispatch(addListener(`keywords`))
    listenToKeywords(({keywords, keywordIdList}) => {
    dispatch(saveKeywords(keywords))
    dispatch(saveKeywordIdList(keywordIdList))
    }, (error) => {
      process.env.NODE_ENV === 'production' ? null : console.log('setKewordsListener Listner Error: ', error)
    })
  }
}

const initialState = {
  fetching: false,
  rehydrationComplete: false,
  error: null,
  currentKeyword: null,
  currentKeywordTimeSearched: null, 
  tweetsData: {},
  keywords: {},
  keywordIdList: [],
}

function addTweetData(state={}, action) {
    switch (action.type) {

  case SAVE_TWEETS_DATA:
    return {
        ...state,
        [action.keyword]: action.tweetsData
      }
   default:
      return state
    }
}

function addKeywords (state = {}, action) {
  switch (action.type) {
    case SAVE_KEYWORDS :
      return {...action.keywords}
    default :
      return state
  }
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
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case SET_CURRENT_KEYWORD:
      return {
        ...state,
        currentKeyword: action.keyword,
        currentKeywordTimeSearched: action.timeSearched,
      }
    case SAVE_TWEETS_DATA:
      return {
        ...state,
        tweetsData: addTweetData(state['tweetsData'], action),
      }
  case SAVE_KEYWORDS :
      return {...state, keywords: addKeywords(state['keywords'], action)}
  case SAVE_KEYWORD_ID_LIST :
      return { ...state, keywordIdList: action.keywordIdList}
    case REHYDRATE_COMPLETE:
      return {
        ...state,
        rehydrationComplete: true,
      }
    default:
      return state
  }
}


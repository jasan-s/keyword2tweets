import axios from 'axios'
import {firebaseRef} from 'config/constants'

export async function fetchTweetsGivenKeyword(keyword) {
  try {
    const response = await axios.post(`https://us-central1-keyword2tweets.cloudfunctions.net/twitterKeyword2Tweets`, {keyword: keyword})
     process.env.NODE_ENV === 'production' ? null : console.log('fetchTweetsGivenKeyword response from cloud function: ', response)
     return response
    } catch(error) {
      process.env.NODE_ENV === 'production' ? null : console.log('fetchTweetsGivenKeyword error from cloud function: ', error.response)
      return error.response
  }

}


export async function saveSearchedKeywordtoFirebase(keyword) {
  try {
		const createdAtTimeStamp = (Date.now() * -1)
		const keywordId = firebaseRef.child('keywords').push().key
		const keywordData = {keyword, createdAtTimeStamp, keywordId}
		const updates = {}
		// // save data to keyword endpoint
		updates[`/keywords/${keywordId}`] = keywordData
		return firebaseRef.update(updates)
		} catch(error) {
			process.env.NODE_ENV === 'production' ? null : console.log('saveNewCampaignPost error :', error)
			return error
		}
}

export function listenToKeywords(cb, errorCB) {
  firebaseRef.child(`/keywords`).limitToFirst(5).orderByChild('createdAtTimeStamp').on('value', (snapshot) => {
    process.env.NODE_ENV === 'production' ? null : console.log('Snapshot from listenToKeywords: ', snapshot.val())
    const keywords = snapshot.val() || {}
    const keywordIdList = Object.keys(keywords).sort((a, b) => keywords[a].createdAtTimeStamp - keywords[b].createdAtTimeStamp)
    process.env.NODE_ENV === 'production' ? null : console.log('keywordIdList: ', keywordIdList)
    cb({keywords, keywordIdList})
  }, (error) => {
    errorCB(error)
  })
}
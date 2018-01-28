import axios from 'axios'

export default async function fetchTweetsGivenKeyword(keyword) {
  try {
    const response = await axios.post(`https://us-central1-keyword2tweets.cloudfunctions.net/hello`, {keyword: keyword})
     process.env.NODE_ENV === 'production' ? null : console.log('getTwittersUsersFriendIds response from cloud function: ', response)
     return response
    } catch(error) {
      process.env.NODE_ENV === 'production' ? null : console.log('getTwittersUsersFriendIds error from cloud function: ', error.response)
      return error.response
  }

}

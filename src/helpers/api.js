import axios from 'axios'

export default async function fetchTweetsGivenKeyword(keyword) {
  try {
    const response = await axios.post(`https://us-central1-keyword2tweets.cloudfunctions.net/twitterKeyword2Tweets`, {keyword: keyword})
     process.env.NODE_ENV === 'production' ? null : console.log('fetchTweetsGivenKeyword response from cloud function: ', response)
     return response
    } catch(error) {
      process.env.NODE_ENV === 'production' ? null : console.log('fetchTweetsGivenKeyword error from cloud function: ', error.response)
      return error.response
  }

}

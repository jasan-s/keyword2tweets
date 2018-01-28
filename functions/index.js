'use strict';

const functions = require('firebase-functions')
const cors = require('cors')({origin: true})
// Firebase Setup
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
const OAuth = require('oauth')
const urlencode = require('urlencode');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
})



// the funtion gets keyword in req body and returns 10 most recent tweets by default if they exist 
// the count 10 can be altered with calling the function with count in the req.body count must be an integer
// the result_type can also be altered if user  calls the function with result_type in the reg.body choices are "mixed", "recent", "popular"
exports.twitterKeyword2Tweets = functions.https.onRequest((req, res) => {
    cors(req, res, function() {
	    console.log('http trigger function incoming request data: ', req.body)
	    const keyword = req.body.keyword || null
			const count = req.body.count || 10
			const result_type = req.body.result_type || 'recent'
			console.log('req.body: ', req.body)

      const handleError = (error, code) => {
    		console.error('error: ', error)
    		return res.status(code).json({error:error})
    	}

    const handleResponse = (response) => {
    console.log('response being sent to client: ', response)
    return res.status(200).json(response)
    }

		const twitter_consumer_key = functions.config().twitter.consumer_key
		const twitter_consumer_secret = functions.config().twitter.consumer_secret
		const twitter_access_token = functions.config().twitter.access_token
		const twitter_access_token_secret = functions.config().twitter.access_token_secret

    if (!twitter_consumer_key || !twitter_consumer_secret || !twitter_access_token || !twitter_access_token_secret) {
      return handleError('Auth error', 401)
    }

    if (keyword === null) {
      return handleError('incorrect request error', 400)
    }

     const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      twitter_consumer_key,
      twitter_consumer_secret,
      '1.0A',
      null,
      'HMAC-SHA1')

     const keywordEncoded =  urlencode(keyword)

     const uri = `https://api.twitter.com/1.1/search/tweets.json?q=${keywordEncoded}&count=${count}&result_type=${result_type}`
    try {

    oauth.get(uri, twitter_access_token, twitter_access_token_secret, (error, rawData) => {

      if(error) {
        console.log('twitterKeyword2Tweets Error:', error)
        const parsedError = JSON.parse(error.data)
        console.log('parsedError: ', parsedError)

        console.warn('twitterKeyword2Tweets error:', error)
        return handleError('Oops, something went wrong, we could not retrieve tweets. please try again', 500)
      }

      const data = JSON.parse(rawData)
      console.log('tweets data:', data )
      const body = {keyword: keyword , tweetsData: data }
      return handleResponse(body)
    })
    }catch(error) {

      const parsedError = JSON.parse(error.data)
      console.log('twitterKeyword2Tweets Error:', parsedError)

      return handleError('Oops, something went wrong, we could not retrieve tweets. please try again', 500)
    }
    })
})
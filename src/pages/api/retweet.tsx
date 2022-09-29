import { NextApiRequest, NextApiResponse } from 'next'
import Twitter from "twitter"
import { getDatabase, ref, onValue, get, child } from "firebase/database"
import { initializeApp } from '@firebase/app'
import firebase from 'firebase/app'
import {
    getAuth,
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithPopup,
    UserCredential,
    signInWithCredential,
    signOut,
    Auth,
    getIdTokenResult,
    getRedirectResult,
} from '@firebase/auth'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(initializeApp(firebaseConfig))
const provider = new TwitterAuthProvider()

function rt(id, at, ats) {
    try {
        const twitter = new Twitter({
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_API_KEY_SECRET,
            access_token_key: at,
            access_token_secret: ats
        })
        twitter.post('statuses/retweet/' + id, function(error, tweet, response) {
            if (!error) {
              console.log(tweet);
            }
          });
    } catch (error) {
        console.log(`エラーが発生しました: ${error}`)
    }
}

// RT processing.
function retweet(id) {
    const db = ref(getDatabase())
    try {
        get(child(db, `users/`)).then(function(snapshot) {
            for (let key in snapshot.val()) {
                rt(id, snapshot.val()[key].at, snapshot.val()[key].ats)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export default function retweetById(req:NextApiRequest,res:NextApiResponse){
    const tweetId = req.query.id
    try {
        retweet(tweetId)
        res.status(200).json({ message: `リツイートに成功しました`, result: true })
    } catch (e) {
        res.status(500).json({ message: `リツイートに失敗しました: ${e}`,tweetid: tweetId, result: false })
    }
}
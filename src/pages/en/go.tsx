import * as React from "react"
import { useCallback, useEffect, useState } from 'react'
import { initializeApp } from '@firebase/app'
import { getDatabase, ref, set, push, onValue, child, get } from "firebase/database"
import firebase from 'firebase/app'
import { useRouter } from 'next/router'
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
import Head from "next/head"

import styles from "../../styles/go.module.scss"

import { Notification, KIND } from "baseui/notification"
import { Input } from "baseui/input"
import {Search} from 'baseui/icon'
import {Button} from 'baseui/button'

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
const retweetapi = "https://buzzcore.pro/api/retweet/"


function writeUserData(userId, name, email, imageUrl, created_at, at, ats) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl,
    created_at: created_at,
    at: at,
    ats: ats,
  });
}

const useAuth = (auth: Auth) => {
  const [state, setState] = useState<'idel' | 'progress' | 'logined' | 'logouted' | 'error'>(
    'idel'
  )
  const [error, setError] = useState<unknown>('')
  const [credential, setCredential] = useState<UserCredential>()
  const [at, setAt] = useState<unknown>('')
  const [ats, setAts] = useState<unknown>('')
  const dispatch = useCallback(
    (action: { type: 'login'; payload?: { token: string } } | { type: 'logout' }) => {
      setError('')
      switch (action.type) {
        case 'login':
          setState('progress')
          const token = action.payload?.token
          if (token) {
            signInWithCredential(auth, TwitterAuthProvider.credential(null, null))
              .then((result) => {
                setCredential(result)
                setState('logined')
              })
              .catch((e) => {
                setError(e)
                setState('error')
              })
          } else {
            signInWithPopup(auth, provider)
              .then((result) => {
                const credential = TwitterAuthProvider.credentialFromResult(result)
                try {
                  writeUserData(String(result.user.uid), String(result.user.displayName), String(result.user.email), String(result.user.photoURL), String(result.user.metadata.creationTime), String(credential.accessToken), String(credential.secret))
                  window.alert("DBに登録/更新が完了しました🎉")
                } catch (e) {
                  console.log("DB保存エラー")
                  window.alert("DB保存エラー")
                }
                setAt(credential.accessToken)
                setAts(credential.secret)
                setCredential(result)
                setState('logined')
              })
              .catch((e) => {
                setError(e)
                setState('error')
              })
          }
          break
        case 'logout':
          setState('progress')
          signOut(auth)
            .then(() => {
              setCredential(undefined)
              setState('logouted')
            })
            .catch((e) => {
              setError(e)
              setState('error')
            })
          break
      }
    },
    [auth]
  )
  return { state, error, credential, dispatch, at, ats }
}

const Page = () => {
  const router = useRouter()
  const { state, dispatch, credential, error, at, ats } = useAuth(auth)
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      dispatch({ type: 'login', payload: { token } })
    }
  }, [dispatch])
  useEffect(() => {
    if (credential) {
      const token = TwitterAuthProvider.credentialFromResult(credential)?.idToken
      token && sessionStorage.setItem('token', token)
    } else {
      sessionStorage.removeItem('token')
    }
  }, [credential])
  const handleLogin = () => dispatch({ type: 'login' })
  const handleLogout = () => dispatch({ type: 'logout' })
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null)
  const handleClick = (e) =>  {
      e = inputRef.current.value
      const request = new XMLHttpRequest()
      if (state === 'logined') {
        try {
          const crypto = require('crypto')
          const cipher = crypto.createCipher('aes-256-cbc', process.env.CRYPTO_KEY)
          const crypted = cipher.update(e, 'utf-8', 'hex')
          const crypted_text = crypted + cipher.final('hex')
          request.open('GET', `https://buzzcore.pro/api/retweet?id=${String(e)}&token=${String(crypted_text)}`)
          // request.open('GET', `https://buzzcore.pro/`)
          window.alert("retweeted it.🚀💣")
        } catch (error) {
          window.alert("Failed to retweet.😭")
          window.alert(error)
        }
      } else {
        window.alert("Please login first.")
      }
  }
  return (
    <div>
      <Head>
        <link rel="canonical" href="https://buzzcore.pro/en/go/"/>
        <title>Go! | BuzzCore</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.notify}>
        <Notification>
        {() => "By logging in, you agree to the Terms of Use and Privacy Policy."}
        </Notification>
        </div>
        <button className={styles.button} onClick={handleLogin}>Login</button>
        <button className={styles.button} onClick={handleLogout}>Logout</button>
        <div className={styles.result}>
        <div><img src={credential?.user.photoURL} /></div>
        <div><p>UserName: {credential?.user.displayName}</p></div>
        <div><p>UserID: {credential?.user.uid}</p></div>
        <div className={styles.notify}>
        <Notification>
        {() => "Please enter your tweet ID."}
        </Notification>
        </div>
        <Input
          value={value}
          placeholder="Enter the ID of the tweet you want to increase the number of RTs."
          onChange={event => setValue(event.currentTarget.value)}
          clearable
          inputRef={inputRef}
        />
        <Button onClick={handleClick}>
          Go!
        </Button>
        </div>
        <h2>How to get a Tweet ID</h2>
        <div className={styles.result_wrap}>
        <div className={styles.result}>
        <p>It is a random number at the end of the tweet URL.<br/>Enter the ID in <a href="https://syncer.jp/Web/API/Twitter/REST_API/GET/statuses/show/id/#section-4">Syncer</a>, "Execute Request", and when you see the tweet content, you have successfully obtained the ID.</p>
        <p>if tweet URL is<code>https://twitter.com/NIIKUUN/status/1489110587049013248</code>,the Tweet ID is<code>1489110587049013248</code></p>
        </div>
        </div>
      </main>
    </div>
  )
}

export default Page
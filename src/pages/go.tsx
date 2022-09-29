import * as React from "react"
import { useCallback, useEffect, useState } from 'react'
import { initializeApp } from '@firebase/app'
import Link from "next/link"
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

import styles from "../styles/go.module.scss"

import { Notification, KIND } from "baseui/notification"
import { Input } from "baseui/input"
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
          request.open('GET', `https://buzzcore.pro/api/retweet?id=${e}`, false)
          // request.open('GET', `https://buzzcore.pro/`)
          window.alert("リツイートしました🚀💣")
        } catch (error) {
          window.alert("リツイートに失敗しました😭")
          window.alert(error)
        }
      } else {
        window.alert("先にログインを行ってください")
      }
  }
  return (
    <div>
      <Head>
        <link rel="canonical" href="https://buzzcore.pro/go/"/>
        <title>Go!(拡散する) | BuzzCore</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.notify}>
        <Notification>
        {() => "ログインすることで利用規約、プライバシーポリシーに同意したとみなします。"}
        </Notification>
        </div>
        <button className={styles.button} onClick={handleLogin}>ログイン</button>
        <button className={styles.button} onClick={handleLogout}>ログアウト</button>
        <div className={styles.result}>
        <div><img src={credential?.user.photoURL} /></div>
        <div><p>ユーザーネーム: {credential?.user.displayName}</p></div>
        <div><p>ユーザーID: {credential?.user.uid}</p></div>
        <div className={styles.notify}>
        <Notification>
        {() => "ツイートIDを入力してください。"}
        </Notification>
        </div>
        <Input
          value={value}
          placeholder="RT数を増やすツイートのIDを入力"
          onChange={event => setValue(event.currentTarget.value)}
          clearable
          inputRef={inputRef}
        />
        <Button onClick={handleClick}>
          Go!
        </Button>
        </div>
        <h2>ツイートIDの取得方法</h2>
        <div className={styles.result_wrap}>
        <div className={styles.result}>
        <p>ツイートURLの最後にあるランダムな数字です。<br/><a href="https://syncer.jp/Web/API/Twitter/REST_API/GET/statuses/show/id/#section-4">Syncer</a>にIDを入力し、「リクエストを実行」してツイート内容が表示されたらしっかりとIDを取得できています。</p>
        <p>ツイートURLが<code>https://twitter.com/NIIKUUN/status/1489110587049013248</code>の場合ツイートIDは<code>1489110587049013248</code>です。</p>
        </div>
        </div>
        <p><small><Link href="/bye"><a>退会する</a></Link></small></p>
      </main>
    </div>
  )
}

export default Page
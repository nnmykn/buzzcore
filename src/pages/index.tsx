import * as React from "react"
import { initializeApp } from '@firebase/app'
import { getDatabase, ref, set, push, onValue, child, get } from "firebase/database"
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

import { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import Script from 'next/script'


import styles from "../styles/top.module.scss"

import { Notification, KIND } from "baseui/notification"
import { Input } from "baseui/input"
import {Search} from 'baseui/icon'
import {Button} from 'baseui/button'

import * as gtag from '../lib/gtag'

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

const Page = () => {
    const ClickEvent = () => {
        gtag.event({
        action: 'click_event',
        category: 'link_button',
        label: 'event',
        })
    }
    return (
        <div>
            <Head>
                <link rel="canonical" href="https://buzzcore.pro/"/>
                <title key="site:title">BuzzCore | ð£ç¡æã§Twitterã®RTæ°ãå¢ãã(æ¡æ£ãã)ãã¨ã®ã§ããWebã¢ããª</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.notify}>
                <Notification>
                    {() => "ãªãªã¼ã¹ç´å¾ã¯ã¦ã¼ã¶ã¼æ°ãå°ãªãããé »ç¹ã«RTãããå¯è½æ§ãããã¾ãã"}
                </Notification>
                </div>
                <Link href="/go/"><a>
                    <button className={styles.button}  onClick={ClickEvent}><span>Go</span></button>
                </a></Link>
                <div></div>
                <p>Twitterã®RTæ°ãç¡æã§å¢ãããã¨ãã§ããWebã¢ããªã§ãã</p>
                <p><small>â»ç¡æã§å¢ãããã¨ãã§ããå¯¾ä¾¡ã¨ãã¦ããªãã®ã¢ã«ã¦ã³ãã§èªåçã«RTããããã¨ãããã¾ãã</small></p>
            </main>
        </div>
    )
}


export default Page
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
                <title key="site:title">BuzzCore | 💣無料でTwitterのRT数を増やす(拡散する)ことのできるWebアプリ</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.notify}>
                <Notification>
                    {() => "リリース直後はユーザー数が少ないため頻繁にRTされる可能性があります。"}
                </Notification>
                </div>
                <Link href="/go/"><a>
                    <button className={styles.button}  onClick={ClickEvent}><span>Go</span></button>
                </a></Link>
                <div></div>
                <p>TwitterのRT数を無料で増やすことができるWebアプリです。</p>
                <p><small>※無料で増やすことができる対価としてあなたのアカウントで自動的にRTされることがあります。</small></p>
            </main>
        </div>
    )
}


export default Page
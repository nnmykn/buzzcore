import * as React from "react"

import { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import Script from 'next/script'
import { useRouter } from 'next/router'


import styles from "../../styles/top.module.scss"

import { Notification, KIND } from "baseui/notification"
import { Input } from "baseui/input"
import {Search} from 'baseui/icon'
import {Button} from 'baseui/button'

const Page = () => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const handleClick = (e) =>  {
        e = inputRef.current.value
        window.location.assign(`/idcheck/${e}/`)
    }
    const router = useRouter()
    const { text } = router.query
    const id: string = text as string
    return (
        <div>
            <Head>
                <link rel="canonical" href="https://buzzcore.pro/idcheck/"/>
                <title key="site:title">IDCheck | 💣BuzzCore</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.input_wrap}>
                <Input
                    endEnhancer={<Search size="18px" />}
                    placeholder="Input TweetID"
                    inputRef={inputRef}
                />
                <div id="go">
                <Button onClick={handleClick}>
                    GoGo!
                </Button>
                </div>
                </div>
                <div></div>
            </main>
        </div>
    )
}


export default Page
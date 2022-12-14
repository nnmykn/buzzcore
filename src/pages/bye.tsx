import * as React from "react"

import Head from "next/head"


import styles from "../styles/terms-privacy.module.scss"


const Page = () => {
    return (
        <div>
            <Head>
                <link rel="canonical" href="https://buzzcore.pro/bye/"/>
                <title key="site:title">้ไผใใ๐ญ๐ญ๐ญ | BuzzCore</title>
            </Head>
            <main className={styles.main}>
                <h2>้ไผใใ๐ญ๐ญ๐ญ</h2>
                <article>
                    <p>้ไผใใใซใฏ<a href="https://help.twitter.com/ja/managing-your-account/connect-or-revoke-access-to-third-party-apps">ใณใใฉ</a>ใฎใใผใธใซๆธใใฆใใใใขใฏใปในๆจฉใๅใๆถใใพใใฏใขใใชใๅ้คใใๆนๆณใใ่กใใใจใง้ไผใๅฎไบใใพใใ</p>
                    <p>้ไผใใใจๆใใฏใขใซใฆใณใใๆไฝใงใใชใใชใRTใใใใใจใใชใใชใใพใ(RTๆฐใๅขใใใใจใๅบๆฅใชใใชใใพใ)ใ</p>
                </article>
            </main>
        </div>
    )
}


export default Page
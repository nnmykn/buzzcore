import * as React from "react"

import Head from "next/head"


import styles from "../styles/terms-privacy.module.scss"


const Page = () => {
    return (
        <div>
            <Head>
                <link rel="canonical" href="https://buzzcore.pro/bye/"/>
                <title key="site:title">退会する😭😭😭 | BuzzCore</title>
            </Head>
            <main className={styles.main}>
                <h2>退会する😭😭😭</h2>
                <article>
                    <p>退会するには<a href="https://help.twitter.com/ja/managing-your-account/connect-or-revoke-access-to-third-party-apps">コチラ</a>のページに書いてある「アクセス権を取り消すまたはアプリを削除する方法」を行うことで退会が完了します。</p>
                    <p>退会すると我々はアカウントを操作できなくなりRTされることがなくなります(RT数を増やすことも出来なくなります)。</p>
                </article>
            </main>
        </div>
    )
}


export default Page
import * as React from "react"

import Head from "next/head"


import styles from "../styles/terms-privacy.module.scss"

const Page = () => {
    return (
        <div>
            <Head>
                <link rel="canonical" href="https://buzzcore.pro/privacy/"/>
                <title key="site:title">プライバシーポリシー | BuzzCore</title>
            </Head>
            <main className={styles.main}>
                <h2>プライバシーポリシー</h2>
                <article>
                    <p>Go5 Lab.（以下、「運営者」という。）は，ユーザーの個人情報について以下のとおりプライバシーポリシー（以下、「本ポリシー」という。）を定めます。本ポリシーは、運営者がどのような個人情報を取得し、どのように利用・共有するか、ユーザーがどのようにご自身の個人情報を管理できるかをご説明するものです。</p>
                    <h3>個人情報の取得方法</h3>
                    <p>運営者はユーザーがログインをするとき、ユーザーネーム、メールアドレス、アクセストークンを取得させていただきます。</p>
                    <h3>個人情報の利用目的</h3>
                    <p>ユーザの管理、リツイート処理の実行に使用します。</p>
                    <h3>個人データを安全に管理するための措置</h3>
                    <p>運営者は個人情報を正確かつ不正なアクセス・改ざん・漏洩が発生しないように努めます</p>
                    <h3>アクセス解析ツールについて</h3>
                    <p>当サイトでは、アクセス解析のためにGoogle Analyticsを利用しています。 Google Analyticsはデータの収集のためにCookieを使用しますが、個人が特定されることはありません。 Google AnalyticsによるトラッキングはCookieを無効にすることで収集を拒否することが可能です。詳しくはGoogle Analyticsのポリシーと利用規約をご覧ください。</p>
                    <br/>
                    <p><small>２０２２年２月３日　施行</small></p>
                </article>
            </main>
        </div>
    )
}


export default Page
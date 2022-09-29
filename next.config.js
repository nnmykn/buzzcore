require('dotenv').config()
module.exports = {
    env: {
        serviceName: 'BuzzCore', //大文字小文字を区別する正式名称
        serviceNamePlain: 'buzzcore', //大文字小文字を区別しない正式名称
        serviceDomain: 'buzzcore.pro', //httpsや語尾の/無しのドメインのみ(例:pennso.com)
        serviceDescription: 'BuzzCoreとは？無料でTwitterのRT数を増やすことのできるWebアプリです。Twitterと連携することで使用できます。2022年2月4日よりサービスを開始しました。', //サービスの説明文を入力
        serviceIcon: 'https://twemoji.maxcdn.com/v/latest/72x72/1f4a3.png', //サービスのアイコンを指定するためのURL
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "", //Google AnalyticsのIDを入力
        TWITTER_API_KEY: "",
        TWITTER_API_KEY_SECRET: "",
        TWITTER_AT: "",
        TWITTER_ATS: "",
        FIREBASE_API_KEY: "",
        FIREBASE_AUTH_DOMAIN: "",
        FIREBASE_PROJECT_ID: "",
        FIREBASE_STORAGE_BUCKET: "",
        FIREBASE_DATABASE_URL: "",
        FIREBASE_MESSAGING_SENDER_ID: "",
        FIREBASE_APP_ID: "",
        FIREBASE_MEASUREMENT_ID: "",
        CRYPTO_KEY: "",
    }
};
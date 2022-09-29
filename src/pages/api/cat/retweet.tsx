import { NextApiRequest, NextApiResponse } from 'next'
import Twitter from "twitter"

export default function retweetById(req:NextApiRequest,res:NextApiResponse){
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_KEY_SECRET,
        access_token_key: process.env.TWITTER_AT,
        access_token_secret: process.env.TWITTER_ATS,
    })
    try {
        const tweetId = req.query.id
        const token = req.query.token
        client.post('statuses/retweet/' + tweetId)
    } catch (e) {
        res.status(500).json({ message: `リツイートに失敗しました: ${e}`, result: false })
    }
}
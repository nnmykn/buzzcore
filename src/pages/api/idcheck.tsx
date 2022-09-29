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
        client.get('statuses/show?id=' + tweetId)
        res.status(200).json({message: `${tweetId}`,result: true})
    } catch (e) {
        res.status(200).json({result: false })
    }
}
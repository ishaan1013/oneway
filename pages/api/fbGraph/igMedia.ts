// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { captureRejectionSymbol } from 'events'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method === 'GET') {
    try {
      if (req.query.token && req.query.igUserId) { 
        const data = await fetch(`https://graph.facebook.com/v15.0/${req.query.igUserId}/media?fields=media_url&access_token=${req.query.token}`)
        const json = await data.json()
        res.status(200).json({ success: true, message: json })
      }
      else {
        res.status(400).json({ success: false })
      }
    }
    catch (error) {
      res.status(500).json({ success: false, message: error })
    }
  } 
  else if (method === 'POST') {
    try {
      if (req.query.token && req.query.igUserId && req.query.imageUrl) { 
        const data = await fetch(`https://graph.facebook.com/v15.0/${req.query.igUserId}/media?image_url=${req.query.imageUrl}&caption=${req.query.caption}&access_token=${req.query.token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await data.json()
        res.status(200).json({ success: true, json })
      }
      else {
        res.status(400).json({ success: false, query: JSON.stringify(req.query) })
      }
    }
    catch (error) {
      res.status(500).json({ success: false, message: error })
    }
  } 
  else {
    res.status(405).json(`Method ${method} Not Allowed`)
  }


}

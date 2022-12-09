// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method !== 'GET') {
    res.status(405).json(`Method ${method} Not Allowed`)
  }


  try {
    if (req.query.token && req.query.userId) { 
      const data = await fetch(`https://graph.facebook.com/v15.0/${req.query.userId}/accounts?access_token=${req.query.token}`)
      const json = await data.json()
      res.status(200).json({ success: true, message: json })
    }
    else {
      res.status(400).json({ success: false, message: "invalid query" })
    }
  }
  catch (error) {
    res.status(500).json({ success: false, message: error })
  }


}

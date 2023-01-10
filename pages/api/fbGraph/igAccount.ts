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
    if (req.query.token && req.query.pageId) { 
      const data1 = await fetch(`https://graph.facebook.com/v15.0/${req.query.pageId}?fields=instagram_business_account&access_token=${req.query.token}`)
      const json1 = await data1.json()
      const data2 = await fetch(`https://graph.facebook.com/v15.0/${json1.instagram_business_account.id}?fields=username&access_token=${req.query.token}`)
      const json2 = await data2.json()
      const response = {
        id: json1.instagram_business_account.id,
        username: json2.username
      }
      console.log("🚀 ~ file: igAccount.ts ~ json1", json1)
      console.log("🚀 ~ file: igAccount.ts ~ json2", json2)
      res.status(200).json({ success: true, message: response })
    }
    else {
      res.status(400).json({ success: false, message: "invalid query" })
    }
  }
  catch (error) {
    res.status(500).json({ success: false, message: error })
  }


}

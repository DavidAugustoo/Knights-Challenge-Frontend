// pages/api/knights.ts
import type { NextApiRequest, NextApiResponse } from 'next'

import { Knight } from '@shared/types/knight'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Knight[] | { message: string }>,
) {
  if (req.method === 'GET') {
    try {
      const { filter } = req.query

      let url = 'https://k5yddrbtai.us-east-2.awsapprunner.com/knights'
      if (filter) {
        url += `?filter=${encodeURIComponent(filter as string)}`
      }

      const response = await fetch(url)
      const knights: Knight[] = await response.json()

      res.status(200).json(knights)
    } catch (error) {
      console.error('Error fetching knights with filter:', error)
      res.status(500).json({ message: 'Failed to fetch knights' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end('Method Not Allowed')
  }
}

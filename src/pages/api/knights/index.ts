// pages/api/knights.ts
import { NextApiRequest, NextApiResponse } from 'next'

import { Knight } from '@shared/types/knight'

import axios from 'axios'

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

      const response = await axios.get(url)
      const knights: Knight[] = response.data

      res.status(200).json(knights)
    } catch (error) {
      console.error('Error fetching knights with filter:', error)
      res.status(500).json({ message: 'Failed to fetch knights' })
    }
  } else if (req.method === 'POST') {
    try {
      const { body } = req
      const url = 'https://k5yddrbtai.us-east-2.awsapprunner.com/knights'
      const response = await axios.post(url, body)

      res.status(200).json(response.data)
    } catch (error) {
      console.error('Error adding knight:', error)
      res.status(500).json({ message: 'Failed to add knight' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end('Method Not Allowed')
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  const {
    query: { id },
    method,
    body,
  } = req

  switch (method) {
    case 'DELETE':
      try {
        const response = await fetch(
          `https://k5yddrbtai.us-east-2.awsapprunner.com/knights/${id}`,
          { method: 'DELETE' },
        )

        if (!response.ok) {
          const errorResponse = await response.json()
          res.status(response.status).json({ message: errorResponse.message })
          return
        }

        res.status(200).json({ message: 'Knight deleted successfully' })
      } catch (error) {
        console.error('Error deleting knight:', error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'PUT':
      try {
        if (!body.nickname) {
          res.status(400).json({ message: 'Nickname is required' })
          return
        }

        const response = await fetch(
          `https://k5yddrbtai.us-east-2.awsapprunner.com/knights/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname: body.nickname }),
          },
        )

        if (!response.ok) {
          const errorResponse = await response.json()
          res.status(response.status).json({ message: errorResponse.message })
          return
        }

        res.status(200).json({ message: 'Knight updated successfully' })
      } catch (error) {
        console.error('Error updating knight:', error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    default:
      res.setHeader('Allow', ['DELETE', 'PUT'])
      res.status(405).end('Method Not Allowed')
  }
}

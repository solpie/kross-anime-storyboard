import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'drawing.json')
    const data = await fs.readFile(filePath, 'utf-8')
    res.status(200).json(JSON.parse(data))
  } catch (error) {
    console.error('Load error:', error)
    res.status(500).json({ error: 'Failed to load drawing' })
  }
}
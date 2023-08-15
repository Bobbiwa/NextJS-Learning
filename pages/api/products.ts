import type { NextApiRequest, NextApiResponse } from 'next'
import mock from './mock.json'
type Data = {
  products: any[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ products: mock.products.products })
}

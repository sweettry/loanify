import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method === 'POST') {
    const { id, data } = req.body;

    if (!id || typeof id !== 'string') {
      console.log('Error: Invalid ID');
      return res.status(400).json({ message: 'A valid ID is required.' });
    }

    if (!data || typeof data !== 'object') {
      console.log('Error: Invalid data');
      return res.status(400).json({ message: 'Data must be a valid object.' });
    }

    const filePath = path.join(process.cwd(), 'data', 'local-db.json');

    try {
      let database = {};
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        database = JSON.parse(fileContent);
        console.log('Current database:', database);
      }

      database[id] = data;

      fs.writeFileSync(filePath, JSON.stringify(database, null, 2), 'utf8');
      console.log('Data saved successfully');
      return res.status(200).json({ message: 'Data saved successfully!' });
    } catch (error) {
      console.error('File write error:', error);
      return res.status(500).json({ message: 'Failed to save data.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    console.log('Error: Method not allowed');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

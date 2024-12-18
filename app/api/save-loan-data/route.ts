import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'local-db.json');

// POST: Save data to JSON file
export async function POST(request: Request) {
  try {
    const { id, data } = await request.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { message: 'A valid ID is required.' },
        { status: 400 }
      );
    }

    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { message: 'Data must be a valid object.' },
        { status: 400 }
      );
    }

    // Read existing data or create a new object
    let database = {};
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      database = JSON.parse(fileContent);
    }

    // Attach the new data to the ID
    database[id] = data;

    // Write the updated database back to the file
    fs.writeFileSync(filePath, JSON.stringify(database, null, 2), 'utf8');

    return NextResponse.json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { message: 'Failed to save data.' },
      { status: 500 }
    );
  }
}

// GET: Retrieve data from JSON file
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Extract the ID from query parameters

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: 'No data available.' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const database = JSON.parse(fileContent);

    if (id) {
      // Fetch data for a specific ID
      const data = database[id];
      if (!data) {
        return NextResponse.json(
          { message: `No data found for ID: ${id}` },
          { status: 404 }
        );
      }
      return NextResponse.json(data);
    }

    // If no ID is provided, return the entire database
    return NextResponse.json(database);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch data.' },
      { status: 500 }
    );
  }
}

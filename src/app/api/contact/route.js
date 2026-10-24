import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Contact from '@/models/contact';

// Helper to handle connection pooling in Next.js serverless environment
async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(request) {
  try {
    // 1. Ensure database connection
    await connectDB();

    // 2. Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // 3. Basic validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Please provide a valid name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Please provide a message.' },
        { status: 400 }
      );
    }

    // 4. Save to MongoDB
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { message: 'Message sent successfully!', contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET all contact messages
export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
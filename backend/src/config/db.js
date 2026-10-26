import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  try {
    if (uri) {
      console.log(`Connecting to MongoDB at: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(' MongoDB connected successfully via MONGODB_URI');
      return;
    }

    // Fallback to MongoMemoryServer for effortless zero-config local run
    console.log('No MONGODB_URI specified. Initializing in-memory MongoDB server...');
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri();
    await mongoose.connect(memUri);
    console.log(` In-memory MongoDB running at: ${memUri}`);
    console.log(' Tip: To persist across restarts or connect to Atlas, set MONGODB_URI in backend/.env');
  } catch (err) {
    console.error('Failed to connect to primary MongoDB URI, attempting in-memory fallback...', err.message);
    try {
      if (!memoryServer) {
        memoryServer = await MongoMemoryServer.create();
      }
      const fallbackUri = memoryServer.getUri();
      await mongoose.connect(fallbackUri);
      console.log(` In-memory MongoDB fallback connected at: ${fallbackUri}`);
    } catch (fallbackErr) {
      console.error('❌ Critical MongoDB connection failure:', fallbackErr);
      process.exit(1);
    }
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    if (memoryServer) {
      await memoryServer.stop();
    }
    console.log('MongoDB disconnected cleanly');
  } catch (err) {
    console.error('Error during database disconnect:', err);
  }
}

import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from '../services/mongoService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body || '{}');
    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Username and password are required' }),
      };
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid username or password' }),
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid username or password' }),
      };
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
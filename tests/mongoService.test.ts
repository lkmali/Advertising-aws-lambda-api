import { MongoClient } from 'mongodb';
import { createUser, findUser } from '../src/services/mongoService';

const uri = 'your_mongodb_connection_string';
const client = new MongoClient(uri);

describe('MongoService', () => {
    beforeAll(async () => {
        await client.connect();
    });

    afterAll(async () => {
        await client.close();
    });

    test('createUser should add a new user to the database', async () => {
        const user = { username: 'testuser', password: 'testpassword' };
        const result = await createUser(user);
        expect(result).toHaveProperty('insertedId');
    });

    test('findUser should retrieve a user from the database', async () => {
        const user = { username: 'testuser' };
        const result = await findUser(user.username);
        expect(result).toHaveProperty('username', user.username);
    });
});
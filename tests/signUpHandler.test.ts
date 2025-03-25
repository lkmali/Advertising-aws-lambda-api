import { APIGatewayEvent, Context } from 'aws-lambda';
import { signUpHandler } from '../src/handlers/signUpHandler';
import { createUser } from '../src/services/mongoService';

jest.mock('../src/services/mongoService');

describe('signUpHandler', () => {
    const mockEvent: APIGatewayEvent = {
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
        headers: {},
        httpMethod: 'POST',
        isBase64Encoded: false,
        path: '/signup',
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {} as any,
        resource: '',
    } as any;

    const mockContext: Context = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully sign up a user', async () => {
        (createUser as jest.Mock).mockResolvedValueOnce({ id: '123', username: 'testuser' });

        const response = await signUpHandler(mockEvent, mockContext);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({ message: 'User created successfully' });
    });

    it('should return an error if user already exists', async () => {
        (createUser as jest.Mock).mockRejectedValueOnce(new Error('User already exists'));

        const response = await signUpHandler(mockEvent, mockContext);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'User already exists' });
    });

    it('should return an error for invalid input', async () => {
        const invalidEvent = { ...mockEvent, body: JSON.stringify({ username: '', password: '' }) };

        const response = await signUpHandler(invalidEvent, mockContext);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'Invalid input' });
    });
});
import { APIGatewayEvent, Context } from 'aws-lambda';
import { loginHandler } from '../src/handlers/loginHandler';
import { sendResponse } from '../src/utils/responseHelper';

jest.mock('../src/utils/responseHelper');

describe('loginHandler', () => {
    const mockEvent: APIGatewayEvent = {
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
        headers: {},
        httpMethod: 'POST',
        isBase64Encoded: false,
        path: '/login',
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {} as any,
        resource: '',
    } as any;

    const mockContext: Context = {} as any;

    it('should return a JWT token on successful login', async () => {
        const mockToken = 'mockToken';
        jest.spyOn(loginHandler, 'loginHandler').mockResolvedValueOnce(mockToken);
        (sendResponse as jest.Mock).mockReturnValueOnce({ statusCode: 200, body: JSON.stringify({ token: mockToken }) });

        const response = await loginHandler(mockEvent, mockContext);

        expect(response).toEqual({ statusCode: 200, body: JSON.stringify({ token: mockToken }) });
        expect(sendResponse).toHaveBeenCalledWith(200, { token: mockToken });
    });

    it('should return an error response for invalid credentials', async () => {
        jest.spyOn(loginHandler, 'loginHandler').mockRejectedValueOnce(new Error('Invalid credentials'));
        (sendResponse as jest.Mock).mockReturnValueOnce({ statusCode: 401, body: JSON.stringify({ message: 'Invalid credentials' }) });

        const response = await loginHandler(mockEvent, mockContext);

        expect(response).toEqual({ statusCode: 401, body: JSON.stringify({ message: 'Invalid credentials' }) });
        expect(sendResponse).toHaveBeenCalledWith(401, { message: 'Invalid credentials' });
    });
});
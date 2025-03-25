import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { loginHandler } from './handlers/loginHandler';
import { signUpHandler } from './handlers/signUpHandler';
import { sendResponse } from './utils/responseHelper';

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    try {
        switch (event.httpMethod) {
            case 'POST':
                if (event.path === '/login') {
                    return await loginHandler(event);
                } else if (event.path === '/signup') {
                    return await signUpHandler(event);
                } else {
                    return sendResponse(404, { message: 'Not Found' });
                }
            default:
                return sendResponse(405, { message: 'Method Not Allowed' });
        }
    } catch (error) {
        return sendResponse(500, { message: 'Internal Server Error', error: error.message });
    }
};
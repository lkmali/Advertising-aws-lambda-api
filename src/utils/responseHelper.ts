export const sendResponse = (statusCode: number, body: any) => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    };
};

export const sendSuccessResponse = (data: any) => {
    return sendResponse(200, { success: true, data });
};

export const sendErrorResponse = (message: string, statusCode: number = 400) => {
    return sendResponse(statusCode, { success: false, message });
};
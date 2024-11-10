export const formatResponse = (statusCode, data) => {
    return {
        statusCode,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
  
export const errorResponse = (statusCode, message) => {
    return {
        statusCode,
        body: JSON.stringify({ error: message }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
  
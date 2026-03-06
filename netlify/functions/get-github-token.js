exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers, body: ''};
    }

    const code = event.queryStringParameters.code || (event.body ? JSON.parse(event.body).code : null);

    if (!code) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "code가 없습니다." }) };
    }

    const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
    
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: error.message })
        };
        
    } 
};


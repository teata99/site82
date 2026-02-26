exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: 'OK' };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { title, content } = JSON.parse(event.body);
    const TOKEN = process.env.site82_token;

    const response = await fetch('https://api.github.com/repos/teata99/site82/issues', {
        method: 'POST',
        headers: {
            "Authorization": `token ${TOKEN}`,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify({ title, body: content })

    });

    const data = await response.json();

    return {
        statusCode: response.status,
        headers,
        body: JSON.stringify(data)
    };
    
};




            

exports.handler = async (event, context) => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, PATCH'
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers, body: "Method Not Allowed" };
    }

    try {
        const { issueNumber } = JSON.parse(event.body);
        const TOKEN = process.env.site82_token;

        const response = await fetch(`https://api.github.com/repos/teata99/site82/issues/${issueNumber}`, {
            method: 'PATCH', // 상태를 수정하므로 PATCH 사용
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify({ state: 'closed' }) 
        });

        const data = await response.json();

        return {
            statusCode: response.status,
            headers,
            body: JSON.stringify({ message: "삭제(종료) 되었습니다.", data })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: error.message })
        };
    }
};
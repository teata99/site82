exports.handler = async (event, context) => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

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
        body: JSON.stringify({ message: "삭제(종료) 되었습니다.", data })
    };
};
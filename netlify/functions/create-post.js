exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { title, content } = JSON.parse(event.body);
    const TOKEN = process.env.GITHUB_TOKEN;

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
        statusCode: 200,
        body: JSON.stringify({ message: "성공적으로 게시되었습니다!", url: data.html_url })
    };
    
};


            

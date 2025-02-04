
fetch('http://localhost:7000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            query {
                game(id: 2) {
                    id
                    title
                    
                }
            }
        `,
    }),
})
.then(response => response.json())
.then(data => console.log('data:', data))
.catch(error => console.error('Error:', error));
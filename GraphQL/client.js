
fetch('http://localhost:7001/', {
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




// example on mutation


fetch('http://localhost:7001/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            mutation DeleteMutation($id: ID!) {
                deleteGame(id: $id) {
                    id
                    title
                    platform
                }
            }
        `,
        variables: {
            id: 1,
        },
    }),
})
.then(response => response.json())
.then(data => console.log('data:', data))
.catch(error => console.error('Error:', error));

// adding a game

fetch('http://localhost:7001/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            mutation AddMutation($game: AddGameInput!) {
                addGame(game: $game) {
                    id
                    title
                    platform
                }
            }
        `,
        variables: {
            game: {
                title: "League of legends",
                platform: "Riot"
            },
        },
    }),
})
.then(response => response.json())
.then(data => console.log('data:', data))
.catch(error => console.error('Error:', error));
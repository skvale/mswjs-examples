async function main() {
  await window.workerPromise
  fetch('/user').then(response => response.json()).then((userData) => {
    const paragraph = document.createElement('p')
    paragraph.setAttribute('id', 'greeting')
    paragraph.textContent = `Hello, ${userData.firstName}!`
    document.body.appendChild(paragraph)
  })

  fetch('https://api.example.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query ListMovies {
          movies {
            title
          }
        }
      `,
    }),
  }).then(response => response.json()).then(({ data }) => {
    const { movies } = data
    const moviesList = document.createElement("ul")
    moviesList.setAttribute('id', 'graphql-response')
    movies.forEach((movie) => {
      const movieItem = document.createElement("li")
      movieItem.textContent = movie.title
      moviesList.appendChild(movieItem)
    })
    document.body.appendChild(moviesList)
  })
}

main()

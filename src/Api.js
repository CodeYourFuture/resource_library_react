const API_URL = process.env.REACT_API_URL

export async function getResources() {
  return fetch(`${API_URL}/resources`)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        throw new Error("HTTP error")
      }
    })
    .then(res => res.json())
}

export async function getCategoriesAndResourceId() {
  return fetch(`${API_URL}/categories-and-resource-id`)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        throw new Error("HTTP error")
      }
    })
    .then(res => res.json())
}

export async function getCategoriesList() {
  return fetch(`${API_URL}/categories`)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        throw new Error("HTTP error")
      }
    })
    .then(res => res.json())
}

export async function heart (votes) {
  return fetch('api/add-vote', {
    method: 'POST',
    body: JSON.stringify(votes),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json())
}
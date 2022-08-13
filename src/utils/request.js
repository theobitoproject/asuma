import axios from 'axios'

export const get = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: { ...payload } })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err.response || err))
  })
}

export const post = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err.response || err))
  })
}

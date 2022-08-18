export const storeObject = (key, obj) =>
  window.localStorage.setItem(key, JSON.stringify(obj))

export const fetchObject = (key) => {
  const obj = window.localStorage.getItem(key)
  return obj === null ? null : JSON.parse(obj)
}

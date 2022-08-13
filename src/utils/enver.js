export const ENVARS = {
  API_URL: 'VUE_APP_API_URL',
}

export const getEnvar = (key) => process.env[key]

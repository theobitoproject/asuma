import { ENVARS, getEnvar } from '../utils/enver'
import { get } from '../utils/request'

export const getZScore = async (childData) => {
  const response = await get(
    `${getEnvar(ENVARS.API_URL)}/api/zscore`,
    childData
  )
  return response.data.data
}

export const getDataPoints = async (standardName, gender) => {
  const response = await get(
    `${getEnvar(
      ENVARS.API_URL
    )}/api/zscore/standard/data-point-ranges?standardName=${standardName}&gender=${gender}`
  )
  return response.data.data.dataPointRanges
}

import { weightForLength } from './constants'
import { ENVARS, getEnvar } from '../../utils/enver'
import { get } from '../../utils/request'

const getDataPointRangesKey = (standardName, gender) =>
  `${standardName}_${gender}`

export default class DataPointer {
  constructor() {
    this.dataPointRangesDB = {}
  }

  async getDataPointRanges(standardName, gender, ageRange) {
    const key = getDataPointRangesKey(standardName, gender)

    if (key in this.dataPointRangesDB) {
      return this.getSingleDataPointRange(key, standardName, ageRange)
    }

    const response = await get(
      `${getEnvar(
        ENVARS.API_URL
      )}/api/zscore/standard/data-point-ranges?standardName=${standardName}&gender=${gender}`
    )
    const { dataPointRanges: rawDataPointRanges } = response.data.data

    const dataPointRanges = rawDataPointRanges.map(
      ({ ageRange, dataPoints }) => {
        const dataPointsArrays = {
          reference: [],
          sd3Neg: [],
          sd2Neg: [],
          sd1Neg: [],
          sd0: [],
          sd1Pos: [],
          sd2Pos: [],
          sd3Pos: [],
        }
        dataPoints.forEach((item) => {
          dataPointsArrays.reference.push(item.reference)
          dataPointsArrays.sd3Neg.push(item.sd3Neg)
          dataPointsArrays.sd2Neg.push(item.sd2Neg)
          dataPointsArrays.sd1Neg.push(item.sd1Neg)
          dataPointsArrays.sd0.push(item.sd0)
          dataPointsArrays.sd1Pos.push(item.sd1Pos)
          dataPointsArrays.sd2Pos.push(item.sd2Pos)
          dataPointsArrays.sd3Pos.push(item.sd3Pos)
        })

        return {
          ageRange,
          dataPoints: dataPointsArrays,
        }
      }
    )

    this.dataPointRangesDB[key] = dataPointRanges

    return this.getSingleDataPointRange(key, standardName, ageRange)
  }

  getSingleDataPointRange(key, standardName, ageRange) {
    if (standardName === weightForLength) {
      return this.dataPointRangesDB[key].find(
        ({ ageRange: ref }) => ref === ageRange
      ).dataPoints
    }

    let dataPointsArrays = {
      reference: [],
      sd3Neg: [],
      sd2Neg: [],
      sd1Neg: [],
      sd0: [],
      sd1Pos: [],
      sd2Pos: [],
      sd3Pos: [],
    }

    this.dataPointRangesDB[key].forEach(({ dataPoints }) => {
      dataPointsArrays.reference = [
        ...dataPointsArrays.reference,
        ...dataPoints.reference,
      ]
      dataPointsArrays.sd3Neg = [
        ...dataPointsArrays.sd3Neg,
        ...dataPoints.sd3Neg,
      ]
      dataPointsArrays.sd2Neg = [
        ...dataPointsArrays.sd2Neg,
        ...dataPoints.sd2Neg,
      ]
      dataPointsArrays.sd1Neg = [
        ...dataPointsArrays.sd1Neg,
        ...dataPoints.sd1Neg,
      ]
      dataPointsArrays.sd0 = [...dataPointsArrays.sd0, ...dataPoints.sd0]
      dataPointsArrays.sd1Pos = [
        ...dataPointsArrays.sd1Pos,
        ...dataPoints.sd1Pos,
      ]
      dataPointsArrays.sd2Pos = [
        ...dataPointsArrays.sd2Pos,
        ...dataPoints.sd2Pos,
      ]
      dataPointsArrays.sd3Pos = [
        ...dataPointsArrays.sd3Pos,
        ...dataPoints.sd3Pos,
      ]
    })

    return dataPointsArrays
  }
}

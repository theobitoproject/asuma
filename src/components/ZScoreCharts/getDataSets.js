import {
  bmiForAge,
  lengthForAge,
  weightForAge,
  weightForLength,
} from '../../domain/standard'
import { getDefaultDatasets } from './getDefaultDatasets'
import DataPointer from './DataPointer'

const dataPointer = new DataPointer()

const getZScoreDataSet = (x, y) => {
  return {
    type: 'bubble',
    label: 'Z Score',
    data: [
      {
        x,
        y,
        r: 5,
      },
    ],
    backgroundColor: '#2196F3',
  }
}

export const getDataSets = async (standardName, gender, zScore) => {
  const {
    reference: labels,
    sd3Neg,
    sd2Neg,
    sd1Neg,
    sd0,
    sd1Pos,
    sd2Pos,
    sd3Pos,
  } = await dataPointer.getDataPointRanges(
    standardName,
    gender,
    zScore.ageRange
  )

  const datasets = getDefaultDatasets(
    sd3Neg,
    sd2Neg,
    sd1Neg,
    sd0,
    sd1Pos,
    sd2Pos,
    sd3Pos
  )

  return { labels, datasets }
}

export const addZScoreDataset = (datasets, standard, child, age, BMI) => {
  let x,
    y = 0
  if (age === undefined || BMI === undefined) {
    return
  }

  switch (standard) {
    case bmiForAge:
      x = age
      y = BMI
      break

    case lengthForAge:
      x = age
      y = child.height
      break

    case weightForAge:
      x = age
      y = child.weight
      break

    case weightForLength:
      x = child.height
      y = child.weight
      break

    default:
      break
  }

  x = Number(x)
  y = Number(y)

  if (x === 0 && y === 0) {
    return
  }

  datasets.unshift(getZScoreDataSet(x, y))
}

import DataPointer from './getDataPoints'

const dataPointer = new DataPointer()

const getDefaultDatasets = (
  sd3Neg,
  sd2Neg,
  sd1Neg,
  sd0,
  sd1Pos,
  sd2Pos,
  sd3Pos
) => {
  return [
    {
      label: '+3SD',
      borderColor: '#000000',
      backgroundColor: '#000000',
      data: sd3Neg,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: '+2SD',
      borderColor: '#F44336',
      backgroundColor: '#F44336',
      data: sd2Neg,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: '+1SD',
      borderColor: '#FBC02D',
      backgroundColor: '#FBC02D',
      data: sd1Neg,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: 'Median',
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
      data: sd0,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: '-1SD',
      borderColor: '#FBC02D',
      backgroundColor: '#FBC02D',
      data: sd1Pos,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: '-2SD',
      borderColor: '#F44336',
      backgroundColor: '#F44336',
      data: sd2Pos,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: '-3SD',
      borderColor: '#000000',
      backgroundColor: '#000000',
      data: sd3Pos,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
  ]
}

const zScoreIsValid = (zScore) => 'reference' in zScore && 'value' in zScore

const getZScoreYPointByMatch = (zScore, labels, sd0) => {
  const match = labels.findIndex((l) => l === zScore.reference)

  if (!match) {
    return null
  }

  return sd0[match] + zScore.value
}

// TODO: is this really necessary?
// it seems that for the "y" value we could use
// the value entered in the form
// example: a kid with weight=12kg and height=75cm
// and for "weight for length" standard:
// "x" value is 75
// "y" value is 12
// this analysis also applies for all standards
const getZScoreYPoint = (zScore, labels, sd0) => {
  const point = getZScoreYPointByMatch(zScore, labels, sd0)

  if (typeof point === 'number') {
    return point
  }

  let selectedIndex = 0

  for (let index = 0; index < labels.length; index++) {
    if (
      labels[index] <= zScore.reference &&
      labels[index + 1] >= zScore.reference
    ) {
      selectedIndex = index
      break
    }
  }

  const x1 = labels[selectedIndex]
  const y1 = sd0[selectedIndex]
  const x2 = labels[selectedIndex + 1]
  const y2 = sd0[selectedIndex + 1]

  return ((y2 - y1) * (zScore.reference - x1)) / (x2 - x1) - y1
}

const getZScoreDataSet = (zScore, labels, sd0) => {
  return {
    type: 'bubble',
    label: 'Z Score',
    data: [
      {
        x: zScore.reference,
        y: getZScoreYPoint(zScore, labels, sd0),
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

  if (zScoreIsValid(zScore)) {
    datasets.unshift(getZScoreDataSet(zScore, labels, sd0))
  }

  return { labels, datasets }
}

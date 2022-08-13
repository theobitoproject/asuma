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
      label: 'sd3Neg',
      borderColor: '#468FAF',
      backgroundColor: '#468FAF',
      data: sd3Neg,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: 'sd2Neg',
      borderColor: '#61A5C2',
      backgroundColor: '#61A5C2',
      data: sd2Neg,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: 'sd1Neg',
      borderColor: '#89C2D9',
      backgroundColor: '#89C2D9',
      data: sd1Neg,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: 'Median',
      backgroundColor: '#FF7B00',
      borderColor: '#FF7B00',
      data: sd0,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: 'sd1Pos',
      borderColor: '#89C2D9',
      backgroundColor: '#89C2D9',
      data: sd1Pos,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: 'sd2Pos',
      borderColor: '#61A5C2',
      backgroundColor: '#61A5C2',
      data: sd2Pos,
      borderWidth: 2.5,
      pointRadius: 0,
      cubicInterpolationMode: 'monotone',
      borderJoinStyle: 'round',
    },
    {
      label: 'sd3Pos',
      borderColor: '#468FAF',
      backgroundColor: '#468FAF',
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
    backgroundColor: '#eb675e',
    borderColor: '#eb4034',
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

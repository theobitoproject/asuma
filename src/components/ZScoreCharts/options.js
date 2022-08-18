import {
  bmiForAge,
  lengthForAge,
  weightForAge,
  weightForLength,
} from '../../domain/standard'

const getAxisLabelsForStandard = (standard) => {
  let xAxisLabel,
    yAxisLabel = ''

  switch (standard) {
    case bmiForAge:
      xAxisLabel = 'Age [months]'
      yAxisLabel = 'BMI'
      break

    case lengthForAge:
      xAxisLabel = 'Age [months]'
      yAxisLabel = 'Length / Height [cm]'
      break

    case weightForAge:
      xAxisLabel = 'Age [months]'
      yAxisLabel = 'Weight [kg]'
      break

    case weightForLength:
      xAxisLabel = 'Length / Height [cm]'
      yAxisLabel = 'Weight [kg]'
      break

    default:
      break
  }

  return {
    xAxisLabel,
    yAxisLabel,
  }
}

export const getOptions = (standard, aspectRatio) => {
  const { xAxisLabel, yAxisLabel } = getAxisLabelsForStandard(standard)
  return {
    aspectRatio,
    layout: {
      padding: {
        right: 50,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  }
}

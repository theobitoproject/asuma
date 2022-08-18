import {
  bmiForAge,
  lengthForAge,
  weightForAge,
  weightForLength,
} from './constants'

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

export const plugins = [
  {
    id: 'legendsForStandardDeviationNames',
    afterDraw(chart) {
      const { _metasets, ctx } = chart
      ctx.save()

      _metasets.forEach((set) => {
        if (set._dataset.type !== this.type) {
          return
        }
        ctx.font = 'bolder 12px Arial'
        ctx.fillStyle = set._dataset.borderColor
        ctx.fillText(
          set._dataset.label,
          set.data[set.data.length - 1].x + 6,
          set.data[set.data.length - 1].y + 6
        )
      })
    },
  },
  {
    id: 'highlightZScore',
    afterDraw(chart) {
      const { _metasets, ctx, chartArea } = chart
      ctx.save()

      const zScoreSet = _metasets.find((set) => set._dataset.type === 'bubble')
      if (!zScoreSet) {
        return
      }

      const { height, left, top, width } = chartArea

      ctx.strokeStyle = '#2196F3'
      ctx.setLineDash([6])
      ctx.strokeRect(zScoreSet.data[0].x, top, 0, height)

      ctx.setLineDash([6])
      ctx.strokeRect(left, zScoreSet.data[0].y, width, 0)
    },
  },
]

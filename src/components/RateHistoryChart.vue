<script lang='ts' setup>
import { computed } from 'vue';
import { Chart, registerables, LineController } from "chart.js";
import { useExchangeRatesHistory } from '../composables/useExchangeRatesHistory';
import { LineChart } from 'vue-chart-3';

Chart.register(...registerables);

const { from, to } = defineProps(['from', 'to'])
const { data: ratesHistory } = useExchangeRatesHistory({ from, to })

const chartData = computed(() => {
  return ({
    labels: Array.isArray(ratesHistory.value) ? ratesHistory.value.map((history) => history.date) : [],

    datasets: [
      {
        label: 'Rate',
        data: Array.isArray(ratesHistory.value) ? ratesHistory.value.map((history) => history.rate) : [],

        // Interactions
        // pointHoverBackgroundColor: 'red',
        // pointHoverBorderColor: 'red',
        pointHoverBorderWidth: 3,
        // pointHoverRadius: '6px'


        // Line styling
        backgroundColor: 'rgba(1, 225, 101, 0.05)',
        borderColor: 'rgba(1, 225, 101, 1)',
        fill: true,
        // borderJoinStyle: "round",
        tension: 0.4,
        // showLine: false,
        borderWidth: 2,


        // Point Styling
        pointBackgroundColor: 'black',
        // pointBorderColor: 'rgba(251, 0, 197, .8)',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 25,
      },
    ]
  })
})

const chartOptions = computed(() => {
  return ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${from} - ${to}`
      }
    }
  })
})

const originalLineDraw = LineController.prototype.draw

LineController.prototype.draw = function () {
  const chart = this.chart
  const ctx = chart.ctx
  const originalStroke = ctx.stroke

  ctx.stroke = function () {
    ctx.save()
    ctx.shadowColor = ctx.strokeStyle as string
    ctx.shadowBlur = 8
    originalStroke.apply(this, arguments as unknown as [Path2D])
    ctx.restore()
  }
  originalLineDraw.apply(this, [])
  ctx.stroke = originalStroke
}

</script>

<template>
  <LineChart :chart-data='chartData' :options='chartOptions' />
</template>

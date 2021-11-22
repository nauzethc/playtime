<script>
import { defineComponent } from 'vue'
import { DoughnutChart } from 'vue-chart-3'

function parsePolled (polled) {
  if (!polled) return 0
  let multiplier = 1
  if (polled.includes('K')) {
    multiplier = 1000
  } else if (polled.includes('M')){
    multiplier = 1000000
  }
  return parseFloat(polled) * multiplier
}

export default defineComponent({
  name: 'GameplayChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    DoughnutChart
  },
  computed: {
    columns () {
      return ['main', 'extended', 'completionist', 'fastest', 'longest']
    },
    stats () {
      return this.data
        .map(p => ([p.platform, parsePolled(p.polled)]))
        .sort((a, b) => b[1] - a[1])
    },
    total () {
      return this.stats.map(s => s[1]).reduce((a, b) => a + b)
    },
    config () {
      return {
        labels: this.stats.map(p => p[0]),
        datasets: [{
          label: 'Users polled',
          data: this.stats.map(p => p[1]),
          hoverOffset: 4,
          backgroundColor: [
            '#ECFDF5',
            '#D1FAE5',
            '#A7F3D0',
            '#6EE7B7',
            '#34D399',
            '#10B981',
            '#059669',
            '#047857',
            '#065F46',
            '#064E3B'
          ].reverse(),
          hoverBackgroundColor: 'rgb(16, 185, 129)',
          borderColor: "rgb(31, 41, 55)"
        }]
      }
    }
  }
})
</script>

<template>
   <DoughnutChart class="platform-chart" :chartData="config" />
</template>
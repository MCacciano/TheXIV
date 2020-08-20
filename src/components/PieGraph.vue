<script>
import { mapGetters } from 'vuex';
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    total: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: ['Total', 'Owned'],
        datasets: [
          {
            data: [this.total.length, this.chartData.length],
            backgroundColor: ['rgb(203, 213, 224)', 'rgb(43, 108, 176)']
          }
        ]
      },
      this.options
    );
  }
};
</script>

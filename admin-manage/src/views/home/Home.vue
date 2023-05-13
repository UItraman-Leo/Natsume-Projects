<template>
  <div  ref="chart" style="width: 600px;height:400px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted,ref} from 'vue'
const chart = ref()
onMounted (()=>{
// 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(chart.value,null,{
    renderer: 'svg',
  });
// 绘制图表
  myChart.setOption({

    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
})
</script>

<style scoped>

</style>
<template>
  <div style="position: relative;width: 100%;height: 800px;margin: 0 auto">
    <div class="grid_conter">
      <div class="grid_item1" ref="chart1"></div>
      <div class="grid_item2" ref="chart2"></div>
      <div class="grid_item3" ref="chart3"></div>
      <div class="grid_item4" ref="chart4"></div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import {onMounted,ref,onUpdated,nextTick} from 'vue'
import axios from "axios"
import {useStore} from 'vuex'
import groupBy from "@/util/groupBy";
const store = useStore()
const chart1 = ref()
const chart2 = ref()
const chart3 = ref()
const chart4 = ref()
const chart5 = ref()
const newsData = ref()
const usersData = ref()
const productData = ref()
// =======请求======
const getNewsData = async ()=>{
  const res = await axios.get("adminapi/new/list")
  if (res.data.ActionType === "OK"){
    newsData.value = groupBy(res.data.data,'category',['游戏新闻','体育','文章'],1)
    // console.log(newsData.value)
  }
}
const getUsersData = async () => {
  const res = await axios({
    url: '/adminapi/user/list',
    method: 'get',
  })
  if (res.data.ActionType === "OK") {
    usersData.value = groupBy(res.data.data,'role',['管理员','用户','游客'],0)
    // console.log(res.data.data)
  }

}
const getProductData = async ()=>{
  const res = await axios.get("adminapi/product/getlist")
  if (res.data.ActionType === "OK"){
    productData.value = groupBy(res.data.data,'grouping','obj',Object)
  }
}
// =======请求======
onMounted (()=>{
  //用户名展示
  const myChart1 = echarts.init(chart1.value,null,{
    renderer: 'svg',
  });
  myChart1.setOption({
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `💙💚💛💜💝💞${store.state.userInfo.nickname }💞💝💜💛💚💙`,
            fontSize: 40,
            // fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 5000,
            loop: false,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: 'pink'
                }
              }
            ]
          }
        }
      ]
    }
  })
  getNewsData().then(()=>{
    // 柱状图
    const myChart2 = echarts.init(chart2.value,null,{
      renderer: 'svg',
    });
    myChart2.setOption({
      title: {
        text: "文章分类"
      },
      tooltip: {},
      xAxis: {
        data: newsData.value.name
      },
      yAxis: {},
      series: [
        {
          name: '数量',
          type: 'bar',
          data: newsData.value.value
        }
      ]
    })
  })
  getUsersData().then(()=>{
    //   折线图
    const myChart4 = echarts.init(chart4.value,null,{
      renderer: 'svg',
    });
    myChart4.setOption({
      xAxis: {
        type: 'category',
        data: usersData.value.name,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: usersData.value.value,
          type: 'line',
          smooth: true
        }
      ]
    })
  })
  getProductData().then(()=>{
    //   饼图
    const myChart3 = echarts.init(chart3.value,null,{
      renderer: 'svg',
    });
    myChart3.setOption( {
      title: {
        text: '导航分类',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: productData.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  })
})
</script>

<style lang="scss" scoped>
.grid_conter{
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(24,minmax(50px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
}
.grid_item1{
  //background-color:red;
  grid-row: 1;
  grid-column: 1 / 25;
  grid-row: 1 / 3;
}
.grid_item2{
  //background-color:yellow;
  grid-row: 2;
  grid-column: 1 / 10;
  grid-row: 3 / 10;
}
.grid_item3{
  //background-color: rgba(84, 90, 93, 0.73);
  grid-row: 3;
  grid-column: 12 / 24;
  grid-row: 6 / 15;
}
.grid_item4{
  //background-color:palegreen;
  grid-row: 4;
  grid-column: 1 / 10;
  grid-row: 10 / 20;

}
</style>

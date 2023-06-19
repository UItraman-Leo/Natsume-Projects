<template>

<div class="appBg">
<!--    <video src="../assets/Welcome/test.webm" autoplay loop ></video>-->
</div>
  <div id="app">
    <el-row :gutter="0">
      <el-col :span="17">
        <div class="exhibition" ref="exhibition"  :style="{ backgroundImage: `url(${imgUrl})` }">
            <div class="dailyWord">
              <p>{{textData}}</p>
            </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="loginRegister">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item  name="1">
              <template #title>
                <p>Login</p>
              </template>
              <Login/>
            </el-collapse-item>
            <el-collapse-item  name="2">
              <template #title>
                <p>Enroll</p>
              </template>
              <Enroll  @content="contentChange"/>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup >
import Enroll from "@/components/login-enroll/Enroll.vue";
import Login from "@/components/login-enroll/Login.vue";
import {ref,onMounted} from 'vue'
const imgUrl = ref(null)
const textData = ref()
const data =[
  {ad:'砍怪一二三四五，赚钱个十百千万装备回收秒到账，回收上万随便浪。贪玩蓝月你想象不到的赚钱游戏，进来就赚钱，和巨星一起玩贪玩，是兄弟就来一起砍我'},
  {ad:'过年有点闲，进服赚大钱。这句话可算是直接明了的说明了进服就能赚钱的，有心动的小伙伴抓紧时间入座，一刀九九九不是梦；美滋滋过大年。你还在等什么？'},
  {ad:'其实我之前是拒绝拍这个传奇游戏广告的，后来我试玩了一下，哇，爆率真的很高，还送VIP，装备都是BlingBling的，忙的时候还可以离线挂机，现在每天带着成家班去攻沙。哇，好热血，蛮好玩的'},
  {ad:'大扎好，我系轱天乐，我四渣渣辉，探挽懒月，介四里没有挽过的船新版本，挤需体验三番钟，里造会干我一样，爱象节款游戏。介晚的传奇，我就系你的兄弟。'},
  {ad:'这传奇没谁了,登录就送,很暴力BT,一切靠打。'},
  {ad:'无需付费也能称霸游戏;开局送神装，升级快到上天;随时随地挂机一刀999级，装备全靠爆，这游戏3分钟上瘾。'},
  {ad:'开局一只鲲，进化全靠吞'}
]


// 图片
onMounted(()=>{
  let bgRandom = Math.round(Math.random()*19+1)
  let textRandom = Math.round(Math.random()*6)
  imgUrl.value=require(`../assets/Welcome/${bgRandom}.jpg`)
  textData.value = data[textRandom].ad
})
// 手风琴展开状态
const activeName = ref('1')
const contentChange = (res)=>{
  // 注册成功后子组件传递 “1” 改变 activeName 的状态，切换到登录页
  activeName.value = res
}
</script>


<style lang="scss" scoped>
.appBg{
  position:absolute;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(25deg, #f9436d, #ff8c7b, #ffc689, #fffd97)
}
#app{
  width: 1100px;
  height: 440px;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  .el-row{
    width: 100%;
    height:100%;
      //左侧
      .exhibition{
        min-height: 440px;
        border: 1px solid #545c64;
        background-size: 100% 100%;
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-evenly;
        .dailyWord{
          width: 98%;
          max-height: 25em;
          writing-mode: vertical-rl;
          p{
            text-shadow:
                -1px -1px 0px #07fcf4,
            0px 4px 0px #2ec4bd,
            4px 4px 5px #1a817d,
            0px 0px 7px #04fca5;
            line-height: 30px;
            font-family: cursive;
            font-size: 1.3em;
          }
        }
      }
      //右侧
      .loginRegister{
        min-height: 440px;
        border: 1px solid #545c64;
        border-left: 0;
        .el-collapse{
          border:0;
          ::v-deep( .el-collapse-item__header){
            background-image: linear-gradient(90deg, #009f87, #7db097, #c0bfa8, #ffccb9);
              p{
                margin: auto;
                text-shadow:
                    -1px -1px 1px #07fcf4,
                    0px 4px 1px #2ec4bd,
                    4px 4px 5px #1a817d,
                    0px 0px 7px #04fca5;
                line-height: 30px;
                font-family: serif;
                font-size: 1.3em;
              }
          }
          ::v-deep(.el-collapse-item__wrap){
            background: #94efd8;
            //background: 0px 2px url('@/assets/Welcome/loginEnroll.png') no-repeat;
          }


        }

      }

}

}


</style>
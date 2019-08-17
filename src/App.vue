<template>
  <div id="app">
    <router-view/>
    <div>
      <autosize-textarea v-model="textValue" autosize style="width: 414px;"></autosize-textarea>
    </div>
    <div>
      <autosize-textarea2 v-model="textValue" autosize style="width: 414px;"></autosize-textarea2>
    </div>
    <collapse>
        <div slot="title">collapse demo</div>
        <div slot="content">
            塑料袋看见过类似的敬爱个路口建档立卡赶紧来肯定撒结果来看待时间了国际多斯拉克赶紧来看大家<br>
            阿斯利康价格累计撒狗粮尽量靠感觉了肯定就撒了敬爱个垃圾都洒了更加了解啊<br>
            感觉到累计撒狗粮看见了电视剧两个<br>
        </div>
    </collapse>
    <image-view fit="contain" style="width: 100px;height: 100px;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1638079650,2146947483&fm=27&gp=0.jpg"></image-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      textValue: '时即可关键时刻了解过困了就睡的快感就开始金刚骷髅岛加空格键看来读书加空格键打空了金刚骷髅岛数据库里感觉到了恐惧感肯德基离开钢结构'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>

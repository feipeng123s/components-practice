<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <autosize-textarea v-model="textValue" autosize style="width: 414px;"></autosize-textarea>
    </div>
    <!-- <div>
      <autosize-textarea2 v-model="textValue" :autosize="false" style="width: 414px;"></autosize-textarea2>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      textValue: '123'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

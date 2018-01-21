<template>
    <div id="app">
      <a @click="onBtnClick" href="###" class="date">切换日期</a>
    </div>
</template>

<script>
import {GET_BOOKINFO} from "./store/actions/types";
export default {
	name: 'App',
	created(){
		this.$store.dispatch("initLoadData",{
			lid : "2121"
		})
  },
  methods : {
    onBtnClick(e){
      this.$store.dispatch("switchPlayDate",{date:"2018-01-22"});
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
.date{
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center
}
</style>

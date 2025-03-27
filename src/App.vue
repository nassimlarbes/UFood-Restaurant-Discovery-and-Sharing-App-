<template>
  <div id="app">
    <div class="row flex-md-nowrap ">
      <div class="col-md-3 col-xl-2 width-menu" id="navContainer">
        <nav-menu></nav-menu>
      </div>
      <div class="col-md-9 col-xl-10 padding-main" id="routerContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Usersession from "@/components/Usersession";
export default {

  name: "app",
  computed: {
    Usersession() {
      return Usersession
    },
  },
  components: {
    "nav-menu": Navigation,
  },

};



</script>

<style>
@media (min-width: 768px){
.width-menu{
  max-width:  300px;
  min-width: 235px;
  padding-right: 0px;
}
 }

 @media (min-width: 768px){
.padding-main{
  padding-left: 0px;
}
 }
</style>

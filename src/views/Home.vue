<template>
  <div class="home">

    <div class="container">

      <div class="row justify-content-center pt-1 pb-2">
            <div class="col-9 text-center pr-0">
               <b-form-input size="sm" @keydown="search()" v-model="name" class="my-2" style="height:40px;" placeholder="ဆရာတော် နာမည် ဖြင့်ရှာမည်"></b-form-input>
            </div>
            <div class="col-2 text-center pl-2 pr-0">
              <b-button @click="search()" size="sm" class="my-2 pl-4 pr-4 bg-info" style="height:40px;"><i class="fa fa-search"></i></b-button>
            </div>
            <div class="col-1"></div>
      </div>


      <div class="row justify-content-center p-1">

        <router-link v-for="(item,index) in store" :key="index" :to="'/view?id='+(index + 1)" class=" col-6 col-md-4 col-lg-2 p-1">
         <div class="card shadow">
            <img class="card-img-top" style="min-height:27vh;" :src="item.img" alt="Card image cap">
            <div class="card-body" style="min-height:100px;">
              <p class="card-text ">{{item.name}}</p>
            </div>
         </div>
        </router-link>


      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data(){
    return{
      store: [],
      name : ""
    }
  },
  methods:{
    search(){
      const api = require("../api/api.json");
      this.store = api.mp3.filter(res=>{
        return res.title.includes(this.name);
      });
    }
  },
  mounted(){
    const api = require("../api/api.json");
    this.store = api.mp3;
  }
};
</script>

<style lang="scss">


@media only screen and (max-width: 499px) {
  .heroimg{
    height: 30vh;
  }
}

@media only screen and (min-width: 500px) {
  .heroimg{
    max-height: 80vh;
  }
}
</style>

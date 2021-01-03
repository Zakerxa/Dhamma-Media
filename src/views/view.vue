<template>
  <div class="container">

     <div class="row justify-content-center pt-2">
          <div class="col-9 text-center pr-0">
             <b-form-input @keydown="search()" v-model="title" size="sm" class="my-2" style="height:40px;" placeholder="တရားခေါင်းစဥ် နာမည် ဖြင့်ရှာမည်"></b-form-input>
          </div>
          <div class="col-2 text-center pl-2 pr-0">
            <b-button size="sm" class="my-2 pl-4 pr-4 bg-info" style="height:40px;" @click="search()"><i class="fa fa-search"></i></b-button>
          </div>
          <div class="col-1"></div>
    </div>

    <div class="row justify-content-center pb-5 p-1">

      <div class="col p-2 pt-4 text-center">
         <h5 class="font-weight-bold">{{ main.name }} {{main.title}}</h5>
      </div>

      <div class="col-12 text-center pt-2">
        <h5>တရားခေါင်းစဥ် များ </h5>
      </div>

      <router-link :to="'path?id='+id+'&title='+(index+1)" class="col-12 col-lg-5 offset-lg-1 card bg-warning text-dark mt-3 shadow pt-2 pb-2" style="text-decoration:none;height:70px;letter-spacing:1px;" v-for="(item,index) in section" :key="index">
         <b>{{item.title}}</b>
      </router-link>

    </div>

  </div>
</template>

<script>

export default {
  name: "view",
  data(){
    return{
      main: [],
      section:[],
      id    : null,
      title : ""
    }
  },
  methods:{
    search(){
       const api = require("../api/api.json");
       const main = this.main;
       this.section = main.dhamma.filter(res=>{
         return res.title.includes(this.title);
       })
    }
  },
  mounted(){
    const api = require("../api/api.json");
    this.id = this.$route.query.id;

    this.main = api.mp3.find(res=>{
       return res.id == this.id;
     })

    const main = this.main;
    this.section = main.dhamma.map(res=>{
      return res;
    })

  }
};
</script>

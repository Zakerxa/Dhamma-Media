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


      <div class="col-12 text-center pt-2" >
        <h5>( တရားခေါင်းစဥ်များ <span class="badge badge-success">{{ section.length }}</span>  )</h5>
      </div>


      <router-link :to="'path?id='+id+'&title='+(index+1)" class="col-12 col-md-6 col-lg-5 offset-lg-1 card bg-light text-dark mt-3 shadow" style="text-decoration:none;min-height:100px;letter-spacing:1px;" v-for="(item,index) in section" :key="index">
         <div class="row d-flex align-items-center justify-content-center" style="min-height:10vh;">
            <div class="col-4 p-0" style="min-height:100px;">
                 <img :src="main.img" class="w-100" alt="">
            </div>
            <div class="col-8"><b>{{item.title}}</b></div>
         </div>

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
    });



  }
};
</script>

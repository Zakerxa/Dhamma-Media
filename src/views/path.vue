<template>
   <div class="container">

     <div class="row justify-content-center pt-2">
          <div class="col-9 text-center pr-0">
             <b-form-input @keydown="search()" v-model="title" size="sm" class="my-2" style="height:40px;" placeholder="တရားနာမည် ဖြင့်ရှာမည်"></b-form-input>
          </div>
          <div class="col-2 text-center pl-2 pr-0">
            <b-button size="sm" class="my-2 pl-4 pr-4 bg-info" style="height:40px;" @click="search()"><i class="fa fa-search"></i></b-button>
          </div>
          <div class="col-1"></div>
    </div>

     <div class="row justify-content-center pb-5 p-2">
         <div class="col-12 pt-4 pb-3">
          <h5 class="font-weigh-bold mb-0">{{path.title}}</h5>
        </div>

        <div class="col-12 text-center pt-2" >
           <h5>( စုစုပေါင်း အရေအတွက် <span class="badge badge-success">{{ paths.length }}</span>  )</h5>
        </div>

         <router-link :to="'mp3?id='+id+'&title='+titleid+'&mp3='+index++" class="col-12 col-md-5 offset-md-1 col-lg-3 card bg-warning text-dark mt-3 shadow pt-2 pb-2 " style="border-radius:15px;text-decoration:none;" v-for="(item,index) in paths" :key="index">
            <div class="row d-flex align-items-center justify-content-center" style="min-height:10vh;">
              <div  class="text-center col-2 col-md-3 d-flex align-items-center">
                <img src="../assets/symbol.png" class="w-100  pt-2" alt="">
              </div>
              <div class="col-10 col-md-9">
                <p class="m-0">{{item.title}}</p>
              </div>
            </div>
         </router-link>


     </div>

   </div>
</template>

<script>
export default {
  name: "path",
  data(){
    return{
      path:[],
      id  : null,
      titleid:null,
      title : "",
      main : [],
      paths:[]
    }
  },
  methods:{
   search(){
       const api = require("../api/api.json");
       const path = this.path;
       this.paths = path.source.filter(res=>{
         return res.title.includes(this.title);
       })
    }
  },
  mounted(){
    const api = require("../api/api.json");
    this.id = this.$route.query.id;
    this.titleid = this.$route.query.title;
    // console.log(this.$route.query.title);

    const main = api.mp3.find(res=>{
       return res.id == this.id;
    })

    this.path = main.dhamma.find(res=>{
      return res.id == this.titleid;
    })

    this.paths = this.path.source;

  }
};
</script>

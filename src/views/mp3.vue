<template>
  <div class="container">
    <div class="row justify-content-center">
         <div class="col-12 pt-4 p-2 pb-3">
            <h5 class=" p-3 bg-warning" style="border-radius:15px;">{{ mp3.title }}</h5>
         </div>

         <div class="col-12 col-md-6 col-lg-4 text-center">
             <img :src="img" class="w-75" alt="">
         </div>

         <div class="col-12 col-lg-12 text-center pt-5 p-0">
             <audio controls autoplay style="width:100%;">
               <source :src="mp3.url" type="audio/mpeg">
               Your browser does not support the audio tag.
             </audio>
         </div>


    </div>


    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: "mp3",
  data(){
    return{
      mp3:[],
      img:""
    }
  },
  mounted(){
    const api = require("../api/api.json");
    const id = this.$route.query.id;
    const titleid = this.$route.query.title;
    const mp3 = this.$route.query.mp3;

    const main = api.mp3.find(res=>{
       return res.id == id;
    })

    this.img = main.photo;

    const final = main.dhamma.find(res=>{
      return res.id == titleid;
    })

    function checkAdult(mp3) {
      return mp3 == mp3;
    }

    this.mp3 = final.source[mp3];

  },
  components:{

  }
};
</script>

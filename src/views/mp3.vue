<template>
  <div class="container">
    <div class="row justify-content-center">
         <div class="col-12 col-md-10 col-lg-7 pt-4 p-1 pb-3">
            <h6 class=" p-3 bg-warning" style="border-radius:15px;">{{ mp3.title }}</h6>
         </div>

        <div class="col-12 text-center col-md-7 col-lg-7">
          <img :src="img" class="w-50" alt="">

        </div>

         <div class="col-12 col-md-8 col-lg-6 text-center pt-4 pb-4 p-0">

              <audio controls autoplay style="width:100%;">
               <source :src="mp3.url" :type="'audio/'+mp3.type">
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

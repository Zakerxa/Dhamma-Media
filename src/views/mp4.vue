<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 text-center col-md-10 col-lg-7 pt-4 p-0">
        <h6 class="p-3 bg-warning m-0">
            {{ name }}
        </h6>
      </div>

      <div class="col-12 col-md-8 col-lg-6 text-center  pb-4 p-0">
        <video controls autoplay style="width: 100%" oncontextmenu="return false" controlsList="nodownload">
          <source :src="mp4" type="video/mp4" />
          Your browser does not support the audio tag.
        </video>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: "mp4",
  data() {
    return {
      mp4: "",
      name:""
    };
  },
  mounted() {
    const id = this.$route.query.id;
    const name = this.$route.query.name;

    if(id == "p"){
         this.mp4 = "https://media.zakerxa.com/mp4/p.mp4";
         this.name= name;
    }else{
       this.mp4 = "https://media.zakerxa.com/mp4/m.mp4";
       this.name = name;
    }
  },
  components: {},
};
</script>

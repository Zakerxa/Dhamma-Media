<template>
  <div id="app" :style="{background:[ DarkMode ? '#000' : '#fff' ],color:[ TextColor ? '#fff' : '#000']}">


     <div>
       <b-navbar toggleable="lg" :type="[DarkMode ? 'light' : 'dark']" :variant="[DarkMode ? 'dark' : 'light']" class="w-100 position-fixed w-100" style="top:0;z-index:9999;backgroud:#000;">
    <b-navbar-brand class="font-weight-bold" :style="{color:[ TextColor ? '#fff' : '#000']}">Dhamma Media</b-navbar-brand>

    <!-- <div class="ml-auto pr-2">
      <button :style="{background:[ DarkMode ? '#fff' : '#000' ],color:[ TextColor ? '#000' : '#fff']}" class="btn pt-1 pb-1  small"  style="border-radius:100px;" @click="DarkMode =! DarkMode,TextColor =! TextColor"><i class="small">{{ DarkMode ? 'Light' : 'Dark' }}</i></button>
    </div> -->

    <b-navbar-toggle target="nav-collapse" style="outline:none;" >
       <template #default="{ expanded }">
        <i :style="{color:[ TextColor ? '#fff' : '#000']}" v-if="expanded" class="fas fa-angle-double-up" style="font-size:30px;"></i>
        <i :style="{color:[ TextColor ? '#fff' : '#000']}" v-else class="fas fa-angle-double-down" style="font-size:30px;"></i>
      </template>
      </b-navbar-toggle>


    <b-collapse id="nav-collapse" is-nav >
      <b-navbar-nav class="ml-auto">

        <b-nav-item to="/"><p :style="{color:[ TextColor ? '#fff' : '#000']}" class="font-weight-bold mb-0 pt-1 pb-1">Home Page</p></b-nav-item>
        <b-nav-item to="buddhist"><p :style="{color:[ TextColor ? '#fff' : '#000']}" class="font-weight-bold mb-0 pt-1 pb-1">History</p></b-nav-item>
        <b-nav-item to="about"><p :style="{color:[ TextColor ? '#fff' : '#000']}" class="font-weight-bold mb-0 pt-1 pb-1">About</p></b-nav-item>

      </b-navbar-nav>
    </b-collapse>
       </b-navbar>
     </div>

    <b-carousel id="carousel-1" :interval="3000" controls indicators background="#fff" class="pt-5" style="text-shadow: 1px 1px 2px #333;">

         <b-carousel-slide class="heroimg" img-src="https://media.zakerxa.com/hero/4.jpg">
          <h2>Dhamma Media</h2>
          <p>Source from https://thitsarparamisociety.com</p>
        </b-carousel-slide>

        <b-carousel-slide class="heroimg" img-src="https://media.zakerxa.com/hero/5.jpg">
          <h2>Dhamma Media</h2>
          <p>Source from https://thitsarparamisociety.com</p>
        </b-carousel-slide>

        <b-carousel-slide class="heroimg" img-src="https://media.zakerxa.com/hero/6.jpg">
          <h2>Dhamma Media</h2>
          <p>Source from https://thitsarparamisociety.com</p>
        </b-carousel-slide>

        <b-carousel-slide class="heroimg" img-src="https://media.zakerxa.com/hero/1.jpeg">
          <h2>Dhamma Media</h2>
          <p>Source from https://thitsarparamisociety.com</p>
        </b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide class="heroimg" img-src="https://media.zakerxa.com/hero/2.jpeg">
          <h2>Dhamma Media</h2>
          <p>Source from https://thitsarparamisociety.com</p>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide class="heroimg" img-src="https://media.zakerxa.com/hero/3.jpg">
           <h2>Dhamma Media</h2>
           <p>Source from https://thitsarparamisociety.com</p>
         </b-carousel-slide>

    </b-carousel>


    <!-- <div class=" mt-1 p-0 w-100 text-center" style="background:transparent;">
      <GoogleAds/>
    </div>
    <p class="disabled text-muted m-0 p-0 text-center">Advertisement</p> -->
     <div class="pt-3 col-12 text-center">
       <button :style="{background:[ DarkMode ? '#fff' : '#000' ],color:[ TextColor ? '#000' : '#fff']}" class="btn pt-1 w-25 pb-1  small"  style="border-radius:100px;" @click="DarkMode =! DarkMode,TextColor =! TextColor"><span class="small font-weight-bold">{{ DarkMode ? 'Light' : 'Dark' }}</span></button>
     </div>
     <router-view></router-view>



           <div class="row mt-3 text-light p-0 w-100 ml-0 justify-content-center" style="background:#222;">
               <div class="col-12 pt-4">
                  <div class="pb-3 pt-2 text-center">
                       <h5 class="font-weight-bold ">Dhamma Media</h5>
                    </div>
               </div>

                <div class="col-12 text-center col-lg-4 p-3">


                    <h6 class=" font-weight-bold">ဓမ္မဆုံးမစာများ</h6>
                    <p class="mb-0 p-1  small"> မကောင်းမှုရှောင်၊ ကောင်းမှုဆောင်၊ ဖြူအာင် စိတ်ကိုထား၊</p>
                    <p class="mb-0 p-1  small pb-2"> ဘုရားအဆူဆူ၊ မိန့်တော်မူ၊ အတူတူ ထိုတရား...</p>

                    <a class="small text-success" href="message#top">ဆက်လက်ဖတ်ရှုရန်...</a>
                </div>
                <hr>
                <div class="col-12 text-center col-lg-4 p-3">
                    <h6 class=" font-weight-bold">ဗုဒ္ဓဘာသာခြေခံ</h6>
                    <p class="mb-0 p-1  small"> * အမည်- (သိဒ္ဓတ္ထ) ဂေါတမ</p>
                    <p class="mb-0 p-1  small"> * ခမည်းတော် – သုဒ္ဓေါဒန ဂေါတမ မင်းကြီး</p>
                    <p class="mb-0 p-1  small pb-2"> * မယ်တော် – မိဖုရား မဟာ မာယာ (မွေးဖွားပြီး ခုနှစ်ရက်အကြာတွင်သေဆုံးသည်)</p>

                    <a class="small text-success" href="buddhist#top">ဆက်လက်ဖတ်ရှုရန်...</a>
                </div>

                <div class="col-12 text-center col-lg-4 p-2 ">
                  <h6 class="pt-3 font-weight-bold">Feature Link </h6>
                    <a class="d-inline-block " href="/"><p class="text-light pt-3  mb-0">Home / </p></a>
                    <a class="d-inline-block " href="about"><p class="text-light pt-3 pl-2  mb-0"> About / </p></a>
                    <a class="d-inline-block " href="buddhist"><p class="text-light pt-3 pl-2  mb-0"> History / </p></a>
                    <a class="d-inline-block " href="message"><p class="text-light pt-3 pl-2  mb-0"> Message / </p></a>
                    <a class="d-inline-block " href="privacy"><p class="text-light pt-3 pl-2  mb-0"> Privacy  </p></a>
                    <div class="">
                      <p class="mb-0 p-1  small"> ဤ website မှာ တရားတော်များကို နီးစပ်ရာ မိတ်ဆွေများထံသို့လည်း လက်ဆင့်ကမ်း ဓမ္မဒါနဖြန့်ဝေပေးကြပါရန် မေတ္တာရပ်ခံ နှိုးဆော်တိုက်တွန်းအပ်ပါသည်။</p>
                    </div>
                </div>

                <div class="col-12 text-center p-3 pt-4 pb-4 text-center">
                   <h5 class="text-muted p-2">Develoved By Zin Min Htet</h5>
                </div>

     </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GoogleAds from "@/components/GoogleAds.vue";
export default Vue.extend({
  name: 'App',
  data(){
    return{
      DarkMode : false,
      TextColor : false
    }
  },
  components: {
   GoogleAds
  }
});
</script>

<style>
.navbar-toggler-icon{
  color:#000!important;
}
body,html{
  scroll-behavior: smooth;
}
</style>

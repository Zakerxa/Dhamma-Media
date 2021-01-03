<template>
      <div style="background: transparent;" v-html="GoogleAds"></div>
</template>
<script>
export default {
    name : "GoogleAds",
    data(){
        return{
           GoogleAds : ''
        }
    },
     mounted(){
           this.GoogleAds = document.getElementById('GoogleAds').innerHTML;
     }
}
</script>

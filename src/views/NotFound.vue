<template>
  <div class="container">
    <div class="row">
      <div class="col-12 pb-5">
        <h3 class="font-weight-bold">404 : Page Not Found</h3>
         <img src="../assets/pagenotfound.png" class="w-100" alt="">
         <h4 class="text-center">S o r r y</h4>
        <p class="p-2 mb-5 text-monospace">
         The page that you enter is not exist on this site.
        </p>
        <router-link to="/" class="text-center w-100 btn btn-success">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Notfound"
}
</script>

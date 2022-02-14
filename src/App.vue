<template>
  <Navbar/>
  <div class="container">
    <router-view/>
  </div>
  <transition name="slide">
    <toast/>
  </transition>
</template>

<script>
import Toast from "@/components/Toast";
import Navbar from "@/components/Navbar";

export default {
  components: {
    Toast,
    Navbar,
  },
}

</script>

<style scoped>

</style>
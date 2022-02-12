<template>
  <div>Home page</div>
  <div>{{ count }}</div>
  <button @click="count++">add</button>
</template>

<script>
import {useCount} from "@/composables/count";

export default {
  setup() {
    const {count} = useCount();

    return {
      count
    }
  }
}
</script>

<style>

</style>
<template>
  <h1>To-Do Page</h1>
  <todo-form :editing="true"/>
</template>

<script>
import TodoForm from "@/components/TodoForm";

export default {
  components: {
    TodoForm
  },
}

</script>


<style scoped>

</style>
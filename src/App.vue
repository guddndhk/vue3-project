<template>
  <div class="container">
    <h2>To-Do List</h2>
    <todo-simple-form @add-todo="addTodo" />

    <div v-if="!todos.length">
      추가된 todo가 없습니다.
    </div>
    <todo-list :todos="todos" @toggle-todo="toggleTodo" />
  </div>
</template>

<script>
import { ref } from "vue";
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    
    const todos = ref([]);
    
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const addTodo = (todo) => {
      console.log(todo)
      todos.value.push(todo);
    
    };

    const toggleTodo = (index) => {
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
      toggleTodo,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
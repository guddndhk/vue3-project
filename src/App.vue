<template>
  <div class="container">
    <h2>To-Do List</h2>
     <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
     >
     <hr />
    <todo-simple-form @add-todo="addTodo" />

    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <todo-list 
    :todos="filteredTodos" 
    @toggle-todo="toggleTodo"
    @delete-todo="deleteTodo"
     />
  </div>
</template>

<script>
import { ref, computed } from "vue";
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
    
    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value){
        return todos.value.filter(todo =>{
          return todo.subject.includes(searchText.value);
        });
      }
      
      return todos.value;
    });
    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
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
<template>
  <div class="container">
    <h2>To-Do List</h2>
    <todo-simple-form @add-todo="addTodo" />

    <div v-if="!todos.length">
      추가된 todo가 없습니다.
    </div>
    <div 
      v-for="(todo, index) in todos" 
      :key="todo.id" 
      class="card mt-2"
      >
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
          />
          <label class="form-check-label" :class="{ todo: todo.completed }">
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button 
            class="btn btn-danger"
            @click="deleteTodo(index)"
            >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TodoSimpleForm from './components/TodoSimpleForm.vue';


export default {
  components: {
    TodoSimpleForm
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

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
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
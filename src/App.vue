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
    <div style="color: red">{{ error }}</div>

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
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const error = ref('');

    const getTodos = async () => {
      try{
        const res = await axios.get('http://localhost:3000/todos')
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐';
      }
    };

    getTodos();

    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const addTodo = async (todo) => {
      // 데이터베이스에 투두를 저장
      error.value = '';
      try{
      const res = await axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed: todo.completed,
      //요청이 끝나고 오기전에 그다음으로 넘어가기에 프로미스가 리턴이 왔을때 then 키워드를 사용하여 요청이 끝났을때 응답이 왔을때 실행이 되게함
      });
      todos.value.push(res.data);
      } catch (err) {
        console.log(err);
        error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐';
      }
      //.then(res => {
        // 이부분을 밖에 두게되면 axios.post 작업이 끝났는지 아닌지 알수도 없을떄 추가가 되기때문에.. (비동기) ajax 와 비슷하다.혹은 try catch
        //console.log(res)
        //todos.value.push(res.data);
      //}).catch(err => {
        //console.log(err)
        //error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐'
      //});
    };

    const toggleTodo = (index) => {
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    };

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);
      
        todos.value.splice(index, 1);
      } catch (err) {
        console.log(err)
        error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐';
      }
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
      error,
      
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
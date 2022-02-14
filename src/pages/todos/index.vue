<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button
          class="btn btn-primary"
          @click="moveToCreatePage"
      >
        Create Todo
      </button>
    </div>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
    >
    <hr/>

    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <todo-list
        :todos="todos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
    />
    <hr/>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a style="cursor : pointer" class="page-link" @click="getTodos(currentPage - 1)">
            Previous
          </a>
        </li>
        <li
            v-for="page in numberOfPages"
            :key="page"
            class="page-item"
            :class="currentPage == page ? 'active' : ''"
        >
          <a style="cursor : pointer" class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a style="cursor : pointer" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {ref, computed, watch} from "vue";
import TodoList from '@/components/TodoList.vue';
import axios from '@/axios';
import {useToast} from "@/composables/toast";
import {useRouter} from "vue-router";

export default {
  components: {
    TodoList
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();
    //toast
    // const toastMessage = ref('');
    // const toastAlertType = ref('');
    // const showToast = ref(false);
    // const toastTimeOut = ref(null);
    //
    // const triggerToast = (message, type = 'success') => {
    //   toastMessage.value = message;
    //   toastAlertType.value = type;
    //   showToast.value = true;
    //   toastTimeOut.value = setTimeout(() => {
    //     toastMessage.value = '';
    //     toastAlertType.value = '';
    //     showToast.value = false;
    //   }, 3000);
    // }

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
            `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐';
        triggerToast('Something went wrong', 'danger');
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
      try {
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
          //요청이 끝나고 오기전에 그다음으로 넘어가기에 프로미스가 리턴이 왔을때 then 키워드를 사용하여 요청이 끝났을때 응답이 왔을때 실행이 되게함
        });
        await getTodos(1);

      } catch (err) {
        console.log(err);
        error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐';
        triggerToast('Something went wrong', 'danger');
      }
      //.then(res => {
      // 이부분을 밖에 두게되면 axios.post 작업이 끝났는지 아닌지 알수도 없을떄 추가가 되기때문에..
      //console.log(res)
      //todos.value.push(res.data);
      //}).catch(err => {
      //console.log(err)
      //error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐'
      //});
    };

    const toggleTodo = async (index, cheked) => {
      console.log(cheked)
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('todos/' + id, {
          completed: cheked
        });

        todos.value[index].completed = cheked
      } catch (err) {
        console.log(err);
        error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐';
        triggerToast('Something went wrong', 'danger');
      }

    };

    const deleteTodo = async (id) => {
      error.value = '';
      //const id = todos.value[index].id;
      try {
        await axios.delete('todos/' + id);
        await getTodos(1);

      } catch (err) {
        console.log(err)
        error.value = '컴퓨터는 멍청하다 물 좀 줘 라고했니? 물을 어떻게 어디서 누구에게 어떻게 가져다줘 라고해야지..찾아봐';
        triggerToast('Something went wrong', 'danger');
      }
    };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      })
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000)
    });
    // const filteredTodos = computed(() => {
    //   if(searchText.value){
    //     return todos.value.filter(todo =>{
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });
    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      //filteredTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
      moveToCreatePage,
    };
  },
};
</script>

<style>

</style>
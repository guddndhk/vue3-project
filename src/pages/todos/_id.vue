<template>
  <h1>To-Do Page</h1>
  <div v-if="loding">
    Loding...
  </div>
  <form v-else>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input
              v-model="todo.subject"
              type="text"
              class="form-control"
          >
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
                class="btn"
                type="button"
                :class="todo.completed ? 'btn-success' : 'btn-danger'"
                @click="toggleTodoStatus"
            >
              {{ Incomplete ? 'Completed' : 'Incompleted' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">
      Save
    </button>
    <button
        class="btn btn-outline-dark ml-2"
        @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from "axios";
import {ref} from "vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const loding = ref(true);

    const getTodo = async () => {

      const res = await axios.get('http://localhost:3000/todos/' + route.params.id)

      todo.value = res.data
      loding.value = false;
    };

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos'
      })
    };

    getTodo();

    return {
      todo,
      loding,
      toggleTodoStatus,
      moveToTodoListPage,
    }
  }
}

</script>


<style scoped>

</style>
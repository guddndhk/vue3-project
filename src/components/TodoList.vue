<template>
  <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-2"
  >
    <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(todo.id)"
    >
      <div class="flex-grow-1">
        <input
            class="todo-margin"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
        />
        <span :class="{ todo: todo.completed }">
          {{ todo.subject }}
        </span>
      </div>
      <div>
        <button
            class="btn btn-danger"
            @click.stop="deleteTodo(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';

export default {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, {emit}) {
    const router = useRouter();
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = (index) => {
      emit('delete-todo', index);
    };

    const moveToPage = (todoId) => {
      console.log(todoId)
      //router.push('/todos/' + todoId);
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      })

    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
    }
  }
}
</script>

<style scoped>
/*
class:"ml-2" 식이 적용되지 않아 todo-margin 을 만들어서 사용.
 */
.todo-margin{
  margin-left: 2px;
  margin-right: 2px;
}
</style>
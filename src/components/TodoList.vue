<template>
  <!--  <div-->
  <!--      v-for="(todo, index) in todos"-->
  <!--      :key="todo.id"-->
  <!--      class="card mt-2"-->
  <!--  > -->
  <List
      :items="todos"
  >
    <template #default="{ item, index}">
      <div
          class="card-body p-2 d-flex align-items-center"
          style="cursor: pointer"
          @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input
              class="todo-margin"
              type="checkbox"
              :checked="item.completed"
              @change="toggleTodo(index, $event)"
              @click.stop
          />
          <span :class="{ todo: item.completed }">
          {{ item.subject }}
        </span>
        </div>
        <div>
          <button
              class="btn btn-danger"
              @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
    <!--  </div>-->
  </List>
  <Teleport to="#modal">
    <Modal
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo"
    />
  </Teleport>
</template>

<script>
import {useRouter} from 'vue-router';
import Modal from "@/components/DeleteModal";
import {ref} from "vue";
import List from "@/components/List";

export default {
  components: {
    Modal,
    List
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, {emit}) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit('delete-todo', todoDeleteId.value);

      showModal.value = false;
      todoDeleteId.value = null;
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
      showModal,
      openModal,
      closeModal,
    }
  }
}
</script>

<style scoped>
/*
class:"ml-2" 식이 적용되지 않아 todo-margin 을 만들어서 사용.
 */
.todo-margin {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
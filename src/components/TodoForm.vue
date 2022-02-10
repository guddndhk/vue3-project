<template>

  <div v-if="loding">
    Loding...
  </div>
  <form
      v-else
      @submit.prevent="onSave"
  >
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
      <div v-if="editing" class="col-6">
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
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>

    <button
        type="submit"
        class="btn btn-primary"
        :disabled="!todoUpdated"
    >
      Save
    </button>
    <button
        class="btn btn-outline-dark ml-2"
        @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>
  <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastAlertType"
  />
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from "axios";
import {computed, ref} from "vue";
import _ from 'lodash';
import Toast from "@/components/Toast.vue";
import {useToast} from "@/composables/toast";

export default {
  components: {
    Toast
  },
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: ''
    });
    const originalTodo = ref(null);
    const loding = ref(false);
    const todoId = route.params.id;

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();

    //toast
    // const showToast = ref(false);
    // const toastMessage = ref('');
    // const toastAlertType = ref('');
    // const timeOut = ref(null);
    // const triggerToast = (message, type = 'success') => {
    //   toastMessage.value = message;
    //   toastAlertType.value = type;
    //   showToast.value = true;
    //   timeOut.value = setTimeout(() => {
    //     toastMessage.value = '';
    //     toastAlertType.value = '';
    //     showToast.value = false;
    //   }, 3000);
    // }

    // onUnmounted(() => {
    //   console.log('unmounted')
    //   clearTimeout(timeOut.value);
    // });

    const getTodo = async () => {
      loding.value = true;
      try {

        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        todo.value = {...res.data};
        originalTodo.value = {...res.data};

        loding.value = false;
      } catch (error) {
        loding.value = false;
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value)
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos'
      })
    };

    const onSave = async () => {
      try {
        const res = await axios.put('http://localhost:3000/todos/' + todoId, {
          subject: todo.value.subject,
          completed: todo.value.completed
        });

        originalTodo.value = {...res.data};
        triggerToast('Successfully saved!');
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    if (props.editing) {
      getTodo();
    }
    getTodo();

    return {
      todo,
      loding,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
    }
  }
}

</script>


<style scoped>

</style>
<template>
  <modal>
    <template v-slot:title>
      Delete Todo
    </template>
    <template v-slot:body>
      are you sure to delete this todo?
    </template>
    <template v-slot:footer>
      <button
          type="button"
          class="btn btn-secondary"
          @click="onClose"
      >
        Close
      </button>
      <button
          type="button"
          class="btn btn-danger"
          @click="onDelete"
      >
        Delete
      </button>
    </template>
  </modal>
</template>

<script>
import modal from "@/components/Modal";

export default {
  components: {
    modal
  },
  setup(props, {emit}) {
    const onClose = () => {
      emit('close');
    }

    const onDelete = () => {
      emit('delete')
    }
    return {
      onClose,
      onDelete,
    }
  }
}
</script>

<style>

</style>
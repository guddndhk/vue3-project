<template>
  <div class="form-group">
    <label>{{ lable }}</label>
    <input
        :value="subject"
        @input="onInput"
        type="text"
        class="form-control"
    >
    <div
        v-if="error"
        style="color: red"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lable: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    }
  },
  setup(props, {emit}) {
    const onInput = (e) => {
      emit('update:subject', e.target.value);
    };

    return {
      onInput,
    }
  }
}
</script>

<style scoped>

</style>
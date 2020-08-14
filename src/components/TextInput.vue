<template>
  <label class="flex flex-col my-2" for="name">
    <span class="mb-1 text-sm font-semibold">{{ label }}</span>
    <input
      @input="$emit('input', $event.target.value)"
      :type="type"
      :value="value"
      :id="id"
      :placeholder="placeholder"
      class="bg-gray-200 p-1 border border-gray-500 focus:bg-white rounded"
    />
  </label>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <transition name="modal">
    <div
      v-if="showModal"
      class="fixed top-0 left-0 h-full w-full flex justify-center items-center "
    >
      <div
        @click="$emit('close')"
        class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
      ></div>
      <div class="p-2 bg-white rounded shadow z-50">
        <slot name="body" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false
    },
    overlayColor: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>

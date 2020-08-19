<template>
  <transition name="preloader">
    <div class="fixed top-0 left-0 h-full w-full flex justify-center items-center">
      <div class="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white">
        <spinner />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PreLoader'
};
</script>

<style lang="scss" scoped>
.preloader-enter-active,
.preloader-leave-active {
  transition: opacity 0.5s;
}
.preloader-enter,
.preloader-leave-to {
  opacity: 0;
}
</style>

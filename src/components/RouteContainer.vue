<template>
  <div>
    <transition name="fade"
                mode="out-in"
                :duration="600"
                appear
                appear-active-class="animate__animated animate__fadeIn"
                leave-active-class="fade-leave-active"
                enter-active-class="fade-enter-active">
      <router-view/>
    </transition>
  </div>
</template>

<script>
</script>

<style scoped>
.fade-enter-active {
  transition-delay: .3s;
  transition: all .3s;
}

.fade-leave-active {
  transition: all .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
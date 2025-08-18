<template>
  <span>
     <span v-if="permitted">
       <slot></slot>
     </span>
    <span v-else></span>
  </span>
</template>
<script>

export default {
  name: "Permission",
  props: {
    permit: {
      type: String,
      default: '*',
    },
  },
  computed: {
    permitted() {
      if (this.permit === '*') {
        return true;
      }
      let role = this.$store.getters["user/user"].role;
      return role != null && (role.role === this.permit);
    }
  },
}
</script>

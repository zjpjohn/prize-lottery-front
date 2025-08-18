<template>
  <div class="checkbox-group-wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "icheck-checkbox-group",
  props: {
    value: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      values: [],
    };
  },
  methods: {
    pushItem(value) {
      this.values.push(value);
      this.$emit('input', this.values);
    },
    removeItem(value) {
      const index = this.values.indexOf(value);
      this.values.splice(index, 1);
      this.$emit('input', this.values);
    }
  },
  mounted() {
    this.values = this.value;
    this.$on('pushItem', this.pushItem);
    this.$on('removeItem', this.removeItem);
  }
}
</script>

<style scoped>

</style>

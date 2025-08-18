<template>
  <div style="display: inline-block;margin-right: 12px;min-width: 76px">
    <div :class="['checkbox-'+type,
    size?'icheck--'+size:'icheck',
    checked?'checked':'',
    !disabled&&hovered?'hover':'',
    disabled?'disabled':'']">
      <input type="checkbox"
             :value="value"
             v-model="dataValue"
             style="position: absolute;opacity: 0"
             :checked="checked"
             :disabled="disabled"/>
      {{ label }}
      <div
        @click="handleClick"
        @mouseover="hovered=true"
        @mouseout="hovered=false"
        :style="{cursor:!disabled?'pointer':'no-drop'}"
        style="position: absolute; top: 0; left: 0; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "icheck-checkbox",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'blue',
    },
    size: {
      type: String
    }
  },
  data() {
    return {
      dataValue: null,
      checked: false,
      hovered: false,
    }
  },
  computed: {
    isGroup() {
      return this.$parent.$options._componentTag === 'i-checkbox-group';
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) {
        return;
      }
      this.checked = !this.checked;
      if (this.isGroup) {
        if (this.checked) {
          this.$parent.$emit('pushItem', this.value);
        } else {
          this.$parent.$emit('removeItem', this.value);
        }
      } else {
        this.$emit("input", this.checked ? 1 : null);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isGroup) {
        let values = this.$parent.values;
        this.checked = values.indexOf(this.value) >= 0;
        return;
      }
      this.checked = this.value === 1;
    })
  }
}
</script>

<style scoped>
@import "../../assets/css/icheck.css";
</style>

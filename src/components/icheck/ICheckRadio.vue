<template>
  <div style="display: inline-block;margin-right: 12px;min-width: 76px">
    <div :class="['radio-'+radioType,
    size?'icheck--'+size:'icheck',
    value===model?'checked':'',
    !disabled&&hovered?'hover':'',
    disabled?'disabled':'']">
      <input type="radio"
             ref="radio"
             :value="model"
             v-model="model"
             style="position: absolute;opacity: 0"
             :name="radioName"
             :checked="checked"
             :disabled="disabled"/>
      {{label}}
      <div
        @click="handleClick"
        @mouseover="hovered=true"
        @mouseout="hovered=false"
        :style="{cursor:!disabled?'pointer':'no-drop'}"
        style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "icheck-radio",
    props: {
      name: String,
      dataValue: {
        type: [String, Number, Boolean],
      },
      value: {
        type: [String, Number, Boolean],
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'blue'
      },
      size:{
        type:String
      },
    },
    data() {
      return {
        checked: false,
        hovered: false,
      };
    },
    model: {
      prop: 'dataValue',
      event: 'input',
    },
    computed: {
      radioName() {
        return this.name || 'icheck-radio';
      },
      radioType() {
        return this.isGroup ? this.$parent.type : this.type;
      },
      isGroup() {
        return this.$parent.$options._componentTag === 'i-check-radio-group';
      },
      model: {
        get() {
          return this.isGroup ? this.$parent.value : this.dataValue;
        },
        set(val) {
          this.isGroup ? this.$parent.$emit('input', val) : this.$emit('input', val);
        }
      },
    },
    methods: {
      handleClick() {
        !this.disabled && (this.model = this.value);
      }
    },
  }
</script>

<style scoped>
  @import "../../assets/css/icheck.css";
</style>

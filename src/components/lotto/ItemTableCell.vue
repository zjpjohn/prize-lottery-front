<template>
  <div style="padding: 10px 10px;">
    <div style="display: flex;align-items: center">
      <div v-for="(item,index) in balls"
           style="width: 24px;height: 28px;position:relative;text-align: center;line-height:28px;font-size: 13px"
           :style="{
               'background-color':cell.values.includes(item)?'#1890ff':'#f2f2f2',
               'color':cell.values.includes(item)?'#ffffff':'#999999',
               'margin-right':index<balls.length-1?'4px':'0px'
            }">
        <span>{{ item }}</span>
        <div v-if="cell.values.includes(item)"
             style="display:block;position: absolute;top: 0;right: 0;color: white;height: 11px;line-height:11px;text-align: center;font-size: 10px">
          <span style="margin-right: 2px">{{ cell.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const balls = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
];
export default {
  name: "ItemTableCell",
  props: {
    cell: {
      type: Object,
      default: {
        count: 0,
        values: [],
      },
    },
  },
  data() {
    return {
      balls: balls,
    };
  }
}
</script>

<style scoped>

</style>
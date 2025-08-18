<template>
  <transition name="slide-fade"
              v-on:after-enter="afterEnter">
    <div class="slide-detail-card-container"
         :style="{'z-index':zIndex,'top':top+'px','width':width+'px','height':height+'px'}"
         v-if="visible">
      <el-card :style="{'z-index':zIndex}"
               ref="slide"
               id="slide"
               style="height: 100%">
        <div slot="header" class="slide-header">
          <span style="font-size: 17px;font-weight: bold">{{ title }}</span>
          <el-button type="text" icon="el-icon-close" class="icon-size" @click="closeView"></el-button>
        </div>
        <div style="padding: 0 12px" class="slide-content">
          <slot></slot>
        </div>
      </el-card>
    </div>
  </transition>
</template>

<script>
import {PopupManager} from 'element-ui/lib/utils/popup'

export default {
  name: "SlideView",
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {
          padding: 12 + 'px'
        };
      },
    },
    /** 监听点击事件 隐藏视图 */
    listenerIDs: {
      type: Array,
      default: () => {
        return ['app']
      }
    },
    /** 阻挡点击事件 隐藏视图 */
    noListenerIDs: {
      type: Array,
      default: () => {
        return []
      }
    },
    noListenerClass: {
      type: Array,
      default: () => {
        return []
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 400
    },
  },
  data() {
    return {
      height: 0,
      zIndex: PopupManager.nextZIndex(),
    };
  },
  created() {
    this.slideHeight();
    window.addEventListener('resize', this.slideHeight, false)
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    this.listenerIDs.forEach(element => {
      if (document.getElementById(element)) {
        document.getElementById(element).addEventListener('click', this.handleDocumentClick, false);
      }
    });
  },
  methods: {
    slideHeight() {
      this.height = document.body.clientHeight - this.top;
    },
    closeView() {
      this.$emit('slide-close');
      this.$emit('update:visible', false);
    },
    handleDocumentClick(e) {
      let hidden = true;
      let x      = e.clientX,
          y      = e.clientY;

      //slide遮盖层以外的地方点击将隐藏slide-view
      if (document.body.clientWidth - this.width < x && this.top < y) {
        hidden = false;
      }
      this.noListenerIDs.forEach(element => {
        if (document.getElementById(element) &&
            document.getElementById(element).contains(e.target)) {
          hidden = false;
        }
      });
      this.noListenerClass.forEach(element => {
        let items = document.getElementsByClassName(element)
        if (items && hidden) {
          for (let index = 0; index < items.length; index++) {
            const element = items[index]
            if (element.contains(e.target)) {
              hidden = false
              break
            }
          }
        }
      });
      if (document.getElementById('slide')
          && document.getElementById('slide').contains(e.target)) {
        hidden = false
      }
      if (hidden) {
        this.$emit('slide-close');
        this.$emit('update:visible', !hidden);
      }
    },
    afterEnter() {
      this.$emit('slide-enter');
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.slideHeight);
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  will-change: transform;
  transition: all 0.35s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
}

.slide-detail-card-container {
  position: fixed;
  background-color: #FFFFFF;
  right: 0;
}

.slide-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slide-detail-card-container >>> .el-card {
  box-sizing: border-box;
}

.slide-detail-card-container >>> .el-card__header {
  padding: 0 16px;
  height: 50px;
}

.slide-detail-card-container >>> .el-card__body {
  overflow-y: auto;
  padding: 0;
  height: calc(100% - 50px);
}

.icon-size {
  font-size: 22px;
}

.slide-detail-card-container >>> .el-card__body::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
.slide-detail-card-container >>> .el-card__body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f8f8f8;
}

/*定义滑块 内阴影+圆角*/
.slide-detail-card-container >>> .el-card__body::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}

</style>

<template>
  <div class="layout">
    <global-header></global-header>
    <div style="display: flex;justify-content: start;height: 100%;width: 100%">
      <div style="display: flex;flex-direction: column">
        <div class="main-menu">
          <a class="main-list-item" v-for="item in menus"
             @click="switchMenu(item.name)">
            <button class="menu-button" :class="{'main-menu-item-active':mainIndex===item.name}">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </button>
          </a>
          <div style="height: 16px;width: 64px"></div>
        </div>
      </div>
      <div class="layout-container">
        <transition name="fade"
                    mode="out-in"
                    :duration="800"
                    appear
                    appear-active-class="animate__animated animate__fadeIn"
                    leave-active-class="fade-leave-active"
                    enter-active-class="fade-enter-active">
          <div class="sub-menu" v-if="showSub">
            <div class="sub-menu-container">
              <span style="font-size: 20px;color:black;font-weight: 600;margin: 32px 0 16px 0;">
                {{ mainIndex }}
              </span>
              <a class="sub-menu-item"
                 v-for="item in submenu"
                 :key="item.name"
                 :class="{'sub-menu-item-active':subIndex===item.name}"
                 @click="switchSubMenu(item.name)">
                {{ item.name }}
              </a>
            </div>
          </div>
        </transition>
        <div class="layout-content-wrapper" ref="body-content" :style="{overflow:scrollBar}">
          <transition name="fade"
                      mode="out-in"
                      :duration="800"
                      appear
                      v-if="routeView"
                      appear-active-class="animate__animated animate__fadeIn"
                      leave-active-class="fade-leave-active"
                      enter-active-class="fade-enter-active">
            <router-view :key="key"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "./GlobalHeader.vue";
import {extractAside} from "../libs/aside_menu";

export default {
  name: 'LayoutContainer',
  components: {
    GlobalHeader
  },
  computed: {
    key() {
      return this.$route.path.split("/")[1];
    }
  },
  data() {
    return {
      scrollBar: 'auto',
      routeView: true,
      mainIndex: '首页',
      subIndex: null,
      menus: [],
      submenu: [],
      showSub: false,
    };
  },
  methods: {
    handleRouteView() {
      this.routeView = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.routeView = true;
        }, 400);
      });
    },
    loadMenu(mainIndex, subIndex) {
      this.mainIndex = mainIndex;
      let menu       = this.menus.filter(item => item.name === this.mainIndex)[0];
      if (menu.submenu != null && menu.submenu.length > 0) {
        this.submenu  = menu.submenu;
        this.subIndex = subIndex;
        this.showSub  = this.submenu.length > 0;
      }
    },
    switchMenu(index) {
      if (index !== this.mainIndex) {
        this.mainIndex = index;
        let menu       = this.menus.filter(item => item.name === this.mainIndex)[0];
        this.matchSubMenu();
        if (this.submenu.length > 0) {
          let subMenu   = this.submenu[0];
          this.subIndex = subMenu.name;
          this.$router.push({path: subMenu.path});
          return;
        }
        this.$router.push({path: menu.path});
      }
    },
    matchSubMenu() {
      this.showSub = false;
      let filter   = this.menus.filter(item => item.name === this.mainIndex);
      this.submenu = filter.length <= 0 ? [] : (filter[0].submenu || []);
      setTimeout(() => {
        this.showSub = this.submenu.length > 0;
      }, 400);
    },
    switchSubMenu(index) {
      if (this.subIndex !== index) {
        this.subIndex = index;
        let item      = this.submenu.filter(item => item.name === index)[0];
        this.$router.push({path: item.path});
      }
    },
    hasSubmenu() {
      let menu = this.menus.filter(item => item.name === this.mainIndex)[0];
      return menu.submenu && menu.submenu.length > 0;
    }
  },
  created() {
    this.menus = extractAside();
    if (this.menus == null || this.menus.length === 0) {
      console.error("没有菜单信息...");
      return;
    }
    const depth = this.$route.matched.length;
    if (depth >= 2) {
      const root = this.$route.matched[0];
      if (root.meta && root.meta.menu) {
        this.mainIndex = root.meta.name;
        if (root.meta.page == null || !root.meta.page) {
          const current = this.$route.matched[1];
          this.subIndex = current.meta.name;
        }
        this.loadMenu(this.mainIndex, this.subIndex);
      }
    }
    this.$EventBus.$on('refresh-route-view', this.handleRouteView);
    this.$once('hook:beforeDestroy', () => {
      this.$EventBus.$off('refresh-route-view', this.handleRouteView);
    });
  },
  watch: {
    $route(to, from) {
      this.$refs["body-content"].scrollTop = 0;
      this.scrollBar                       = 'hidden';
      setTimeout(() => {
        this.scrollBar = 'auto';
      }, 800);
      //菜单切换
      let depth = to.matched.length;
      if (depth >= 2) {
        let root    = to.matched[0];
        let current = to.matched[1];
        if (root.meta && root.meta.menu) {
          //主菜单切换子菜单必切换
          if (this.mainIndex !== root.meta.name) {
            this.mainIndex = root.meta.name;
            this.matchSubMenu();
            this.subIndex = this.submenu.length > 0 ? current.meta.name : null;
          } else if (this.subIndex !== current.meta.name) {
            this.subIndex = current.meta.name;
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.layout {
  height: 100%;
  width: 100%;
  min-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: rgba(78, 136, 243, 0.08);
}

.layout-container {
  height: 100%;
  width: calc(100% - 120px);
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: start;
}

.layout-content-wrapper {
  height: 100%;
  flex: 1;
  text-align: left;
}

.layout-content-wrapper::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道*/
.layout-content-wrapper::-webkit-scrollbar-track {
  background-color: transparent;
}

/*定义滑块*/
.layout-content-wrapper::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #d5d5d5;
}

.fade-enter-active {
  transition-delay: .4s;
  transition: all .4s;
}

.fade-leave-active {
  transition: all .4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.main-menu {
  width: 120px;
  padding-bottom: 60px;
  box-sizing: border-box;
  height: 100%;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
}

.main-menu::-webkit-scrollbar {
  width: 0 !important;
}

.sub-menu {
  width: 140px;
  height: 100% !important;
  box-sizing: border-box;
}

.sub-menu-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
}

.sub-menu-container::-webkit-scrollbar {
  width: 0 !important;
}

.main-list-item {
  width: 120px;
  height: 42px;
  display: block;
  position: relative;
}

.menu-button {
  width: 120px;
  height: 42px;
  color: black;
  padding-left: 20px;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: transparent;
  -webkit-transition: background-color .5s cubic-bezier(.4, 0, .2, 1);
  transition: background-color .5s cubic-bezier(.4, 0, .2, 1);
  -webkit-box-align: center;
}

.menu-button:hover i, .menu-button:hover span {
  color: #006eff !important;
}

.menu-button i {
  font-size: 20px;
  color: #40485b;
}

.menu-button span {
  padding-left: 8px;
  font-size: 15px;
  color: #40485b;
}

.main-menu-item-active i {
  color: #006eff !important;
}

.main-menu-item-active span {
  color: #006eff !important;
  font-weight: 600 !important;
}

.sub-menu-item-active {
  text-decoration: none;
  background-color: rgba(78, 136, 243, 0.15);
  color: #1890ff !important;
  transition: color .2s cubic-bezier(.645, .045, .355, 1);
}

.sub-menu-item {
  position: relative;
  text-align: center;
  width: 100px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  cursor: pointer;
  color: #40485b;
  border-radius: 6px;
}

.sub-menu-item:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(78, 136, 243, 0.10);
  z-index: -1;
  border-radius: 6px;
  transform: scaleX(0);
  transition: 0.25s;
}

.sub-menu-item:not(:last-child) {
  margin-bottom: 8px;
}

.sub-menu-item:hover:not(.sub-menu-item-active) {
  z-index: 1;
  background: transparent;
  transition: color .2s cubic-bezier(.645, .045, .355, 1);
}

.sub-menu-item:hover:before {
  transform: scaleX(1);
}

</style>
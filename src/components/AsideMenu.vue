<template>
  <div class="aside-menu">
    <div class="main-menu">
      <a class="main-list-item" v-for="item in menus"
         :class="{'main-menu-item-active':mainIndex===item.name}"
         @click="switchMenu(item.name)">
        <button class="menu-button">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </button>
      </a>
      <div style="height: 16px;width: 64px"></div>
    </div>
    <div class="sub-menu" :class="expand?'sub-menu-expand':'sub-menu-collapse'">
      <div class="sub-menu-container">
        <a class="sub-menu-item"
           v-for="item in submenu"
           :key="item.name"
           :class="{'sub-menu-item-active':subIndex===item.name}"
           @click="switchSubMenu(item.name)">
          {{ expand && showText ? item.name : '' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {extractAside} from "../libs/aside_menu";
import {mapGetters} from "vuex";

export default {
  name: 'AsideMenu',
  props: {
    defaultIndex: {
      type: String,
      default: null,
      required: true,
    },
    title: {
      type: String,
      default: '综合管理台',
    },
  },
  computed: {
    ...mapGetters([
      'expand',
      'showText'
    ]),
  },
  data() {
    return {
      mainIndex: this.defaultIndex,
      subIndex: null,
      menus: null,
      submenu: null,
      remark: null,
      height: document.body.clientHeight - 64,
    };
  },
  methods: {
    loadMenu(mainIndex, subIndex) {
      this.mainIndex = mainIndex;
      let menu       = this.menus.filter(item => item.name === this.mainIndex)[0];
      if (menu.submenu != null && menu.submenu.length > 0) {
        this.remark = menu.remark;
        this.matchSubMenu();
        this.subIndex = subIndex;
      }
    },
    switchMenu(index) {
      if (index !== this.mainIndex) {
        this.mainIndex = index;
        let menu       = this.menus.filter(item => item.name === this.mainIndex)[0];
        this.remark    = menu.remark;
        this.matchSubMenu();
        if (this.submenu && this.submenu.length > 0) {
          let subMenu   = this.submenu[0];
          this.subIndex = subMenu.name;
          this.$router.push({path: subMenu.path});
          return;
        }
        this.$router.push({path: menu.path});
      }
    },
    matchSubMenu() {
      this.submenu = this.menus.filter(item => item.name === this.mainIndex)[0].submenu;
      let hasMenu  = this.hasSubmenu();
      this.$store.dispatch('expand', hasMenu);
      this.$store.dispatch('hasSub', hasMenu);
      setTimeout(() => {
        this.$store.dispatch('showText', hasMenu);
      }, 200)
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
  watch: {
    $route(to, _) {
      let depth = to.matched.length;
      if (depth >= 2) {
        let root    = to.matched[0];
        let current = to.matched[1];
        if (root.meta && root.meta.menu) {
          //主菜单切换子菜单必切换
          if (this.mainIndex !== root.meta.name) {
            this.remark    = root.meta.remark;
            this.mainIndex = root.meta.name;
            this.matchSubMenu();
            this.subIndex = current.meta.name;
          } else if (this.subIndex !== current.meta.name) {
            this.subIndex = current.meta.name;
          }
        }
      }
    },
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
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.height = document.body.clientHeight - 64;
    });
    this.$once('hook:destroyed', () => {
      window.removeEventListener('resize', () => {
        this.height = document.body.clientHeight - 64;
      });
    });
  },
}
</script>

<style scoped>
.aside-menu {
  display: flex;
  height: 100%;
}

.main-menu {
  width: 64px;
  padding-bottom: 60px;
  box-sizing: border-box;
  background-color: #171c3a;
  height: 100%;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
}

.main-menu::-webkit-scrollbar {
  width: 0 !important;
}

.sub-menu {
  height: 100% !important;
  box-sizing: border-box;
}

.sub-menu-container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.sub-menu-container::-webkit-scrollbar {
  width: 0 !important;
}

.main-list-item {
  width: 64px;
  height: 60px;
  display: block;
  position: relative;
}

.main-menu-item-active .menu-button {
  background: #006eff;
}

.main-list-item:hover {
  color: #1890ff;
  text-decoration: none;
}

.menu-button {
  width: 64px;
  height: 60px;
  color: #FFFFFF;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -webkit-transition: background-color .5s cubic-bezier(.4, 0, .2, 1);
  transition: background-color .5s cubic-bezier(.4, 0, .2, 1);
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
}

.menu-button i {
  font-size: 22px !important;
}

.menu-button span {
  font-size: 13px;
}

.sub-menu-item-active {
  text-decoration: none;
  background-color: rgba(78, 136, 243, 0.15);
  color: #1890ff !important;
  transition: color .2s cubic-bezier(.645, .045, .355, 1);
}

.sub-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  font-size: 15px;
  cursor: pointer;
  justify-content: center;
  color: #40485b;
  margin: 8px 0 0 16px;
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
  margin-bottom: 4px;
}

.sub-menu-item:hover:not(.sub-menu-item-active) {
  z-index: 1;
  background: transparent;
  transition: color .2s cubic-bezier(.645, .045, .355, 1);
}

.sub-menu-item:hover:before {
  transform: scaleX(1);
}

.sub-menu-expand {
  width: 130px;
  transition: width 0.25s linear;
}

.sub-menu-collapse {
  width: 0;
  transition: width 0.25s linear;
}

</style>
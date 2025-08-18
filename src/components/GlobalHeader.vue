<template>
  <div class="header">
    <div style="display: flex;justify-content: start">
      <div class="logo">
        <el-avatar :src="logo" :size="38" style="background-color: transparent"></el-avatar>
      </div>
      <div style="margin-left: 24px;display: flex;align-items: center">
        <bread-crumb></bread-crumb>
      </div>
    </div>
    <div class="tool-container">
      <div class="tool-item">
        <screen-full :color="'black'" :size="20"></screen-full>
      </div>
      <div class="tool-item">
        <i class="el-icon-search" style="font-size: 20px;color:black"></i>
      </div>
      <div class="tool-item">
        <message-hint></message-hint>
      </div>
      <div class="tool-item">
        <i class="icon icon-refresh"
           :class="refreshed?'rotate':''"
           style="font-size: 20px;color:black"
           @click="refreshPage"></i>
      </div>
      <div class="tool-item">
        <i class="icon icon-help1" style="font-size: 20px;color:black"></i>
      </div>
      <el-dropdown @command="handleCommand" placement="top">
        <div class="user-info">
          <el-avatar :src="avatar" :size="20" style="background-color: transparent"></el-avatar>
          <span class="user-name">{{ user.name|defaultVal }}</span>
          <i class="el-icon-arrow-down user-icon"></i>
        </div>
        <el-dropdown-menu v-slot="dropdown">
          <el-dropdown-item command="1">
            <div style="display: flex;align-items: center;">
              <i class="el-icon-switch-button"></i>
              <span class="">退出系统登录</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "./BreadCrumb.vue";
import ScreenFull from "./ScreenFull.vue";
import MessageHint from "./MessageHint.vue";
import {mapGetters} from "vuex";
import {adminLoginOut} from "../api/adm-service";

export default {
  name: 'GlobalHeader',
  components: {
    MessageHint,
    ScreenFull,
    BreadCrumb
  },
  filters: {
    defaultVal(value) {
      return !value ? '请先登录' : value;
    }
  },
  computed: {
    ...mapGetters([
      'expand',
      'hasSub',
    ]),
    ...mapGetters({user: 'user/user'}),
  },
  data() {
    return {
      refreshed: false,
      logo: require('../assets/images/avatar.png'),
      avatar: require('../assets/images/avatar.png'),
    };
  },
  methods: {
    handleCommand(command) {
      adminLoginOut()
          .then(_ => this.$store.dispatch('user/loginOut'))
          .then(_ => this.$router.push('/login'));
    },
    collapseOrExpand() {
      this.$store.dispatch('expand', !this.expand);
      setTimeout(() => {
        this.$store.dispatch('showText', this.expand);
      }, 200)
    },
    refreshPage() {
      this.refreshed = false;
      setTimeout(() => {
        this.refreshed = true;
      }, 200);
      this.$EventBus.$emit('refresh-route-view');
      this.$router.replace({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          t: Date.now()
        },
      });
    }
  },
}
</script>

<style scoped>
.header {
  width: 100% !important;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.logo {
  height: 60px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-container {
  display: flex;
  justify-content: end;
  align-items: end;
  margin-right: 32px;
}

.tool-item {
  width: 38px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-item:hover {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 52px;
}

.user-info:focus {
  outline: 0;
}

.user-info .user-icon {
  color: black;
  margin-left: 4px;
  font-size: 12px !important;
  display: block;
  transition: all 0.2s ease-in-out;
}

.user-info:hover .user-icon {
  transform: rotate(180deg);
}

.user-name {
  color: black;
  width: 60px;
  font-size: 17px !important;
  text-align: center;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate {
  animation: rotate 0.75s linear 1;
}

.expand {
  color: black;
  height: 50px;
  width: 28px;
  font-size: 15px;
  font-weight: 500;
  margin-top: 1px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand:hover {
  cursor: pointer;
}
</style>
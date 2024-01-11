<template>
  <div id="app">
    <div class="left-menu" v-show="index&&index!=='/'&&index!=='/login'">
      <el-menu
          :default-active="index"
          :collapse="collapse"
          :style="{width:collapse?'auto':'200px'}"
          text-color="white" router
          unique-opened
          background-color="#545c64">
        <el-submenu index="折叠"
                    @click.native="toggleCollapse">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            <span>折叠</span>
          </template>
          <el-menu-item v-if="collapse"
                        @click="toggleCollapse">
            <i class="el-icon-s-operation"></i>
            <span>展开</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu v-for="item in menus" :index="item.index">
          <template slot="title">
            <i :class="'el-icon-'+item.icon"></i>
            <span>{{item.index}}</span>
          </template>
          <el-menu-item :index="bean.path"
                        v-if="!(bean.have)||(bean.have).indexOf(status)!==-1"
                        v-for="bean in item.children">
            <i class="el-icon-menu"></i>
            <span>{{bean.menu}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>



    <div style="width: 100%; height:auto">
      <el-button class="logout"
                 v-if="index&&index!=='/'&&index!=='/login'"
                 plain type="primary" @click="logout">退出登录</el-button>
      <span class="welcome"
            v-if="index&&index!=='/'&&index!=='/login'">欢迎{{welcome}}</span>
    </div>
    <router-view style="height: 100%; overflow: auto;">
    </router-view>

  </div>
</template>

<script>

export default {
  data(){return{
    collapse: false,
    welcome: '',
    menus: [
      { path: '/index', icon: 'platform-eleme',index: '首页',have:['管理员,老师,学生']},
          { index: '课程', icon: 'platform-eleme', children: [
            { path: '/choosesubject', menu: '选课',have:['学生']},
            { path: '/check', menu: '选课查看',have:['学生']},
            { path: '/grade', menu: '成绩查询',have:['学生']},
        ]},
          { index: '医生', icon: 'platform-eleme', children: [
              { path: '/tgrade', menu: '成绩录入',have:['老师']},
              { path: '/chart', menu: '成绩分析',have:['老师']}
        ]},
          { index: '信息管理', icon: 'setting', children: [
              { path: '/user', menu: '人员管理',have:['管理员']},
              { path: '/subject', menu: '课程管理',have:['管理员']},
              { path: '/college', menu: '学院管理',have:['管理员']},
              { path: '/getsubject', menu: '选课管理',have:['管理员']},
        ]},
    ],
    index: '',
    status: '',
  }},
  watch: { // 监听路由变化
    $route(to, from) {
      this.index = to.path;
      localStorage.setItem('index', this.index);
      this.isLogin();
    }
  },
  mounted(){
    this.collapse = JSON.parse(sessionStorage.getItem('collapse'));
    this.index = localStorage.getItem('index');
    if (this.isLogin()) {
      this.$router.push('/login');
    }
  },
  methods: {
    toggleCollapse() {
      this.collapse = !this.collapse;
      sessionStorage.setItem('collapse', this.collapse);
    },
    isLogin() {
      this.status = localStorage.getItem('status');
      if (this.status) {
        this.welcome = this.status + localStorage.getItem('name');
        return false;
      }
      return true;
    },
    logout() {
      localStorage.removeItem('status');
      localStorage.removeItem('user');
      localStorage.removeItem('name');
      localStorage.removeItem('uid');
      this.$router.push('/login');
    },
  }
}
</script>

<style>
html,body,#app{
  padding:0;
  margin: 0;
  height: 100%;
  overflow: hidden;
}
.left-menu{
  float: left;
  height:100%;
}
.el-menu{
  height: 100%;
  border-right: none;
}
.el-menu-item.is-active{
  background-color: rgba(0,0,0,0.1)!important;
}
.logout{
  position: fixed;
  right: 15px;
  top: 5px;
}
.welcome{
  line-height: 49px;
  position: fixed;
  right: 125px;
  top: 0;
  pointer-events: none;
}
</style>
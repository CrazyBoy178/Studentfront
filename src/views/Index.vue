<template>
<div>
    <h1>欢迎来到学生信息管理系统</h1>
    <h2>欢迎{{welcome}}</h2>
</div>
</template>
<script >
export default {
  data() {
    return {
     welcome:'',
    }
  },
  methods:{
    init() {
      this.status = localStorage.getItem('status');
      if (this.status) {
        this.welcome = this.status + localStorage.getItem('name');
      }
    },
  },
  mounted() {
    this.init();
  }
}
</script>



<style scoped>

</style>
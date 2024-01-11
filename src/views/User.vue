<template>
  <div>
    <h1 style="padding: 10px">人员管理</h1>
    <div class="upload">
      <form action="http://localhost:8080/user/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="上传人员名单">
      </form>
    </div>

    <Table :util="{
    httpUrl:'/user',
    params:'',
    name:'姓名',
    username:'用户名',
    password:'密码',
    status:'身份//sid',
  }" :curpage="1" :headhide="4">
      <el-button type="primary" @click="downloadTemplate">下载模板</el-button>
      <a ref="downloadLink" style="display: none;"></a></Table>
  </div>

</template>

<script>
export default {
  methods: {
    downloadTemplate() {
      // 替换为你的后端下载接口路径
      // 设置下载链接和文件名
      this.$refs.downloadLink.href = "http://localhost:8080/user/download";

      // 模拟点击触发下载
      this.$refs.downloadLink.click();
    }
  }
};

</script>

<style>

</style>
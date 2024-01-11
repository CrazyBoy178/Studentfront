<template>
  <div>
    <h1 style="padding: 10px">选课管理</h1>
    <div class="upload">
      <form action="http://localhost:8080/choose/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="上传文件">
      </form>
    </div>


    <Table :util="{
    httpUrl:'/choose',
    params:'/chooseinfo',
    username: '用户名',
    name:'学生姓名',
    subname:'课程名'
  }" :curpage="1" :headhide="13">
      <el-button type="primary" @click="downloadTemplate">下载模板</el-button>
      <a ref="downloadLink" style="display: none;"></a>

    </Table>
  </div>

</template>

<script>

export default {
  methods: {
    downloadTemplate() {
      // 替换为你的后端下载接口路径
      // 设置下载链接和文件名
      this.$refs.downloadLink.href = "http://localhost:8080/choose/download";

      // 模拟点击触发下载
      this.$refs.downloadLink.click();
    },

  },
};
</script>

<style scoped>
.upload {
  display: inline-block;
  padding: 10px;
}
</style>
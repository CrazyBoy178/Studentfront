<template>
  <div>
    <h1 style="padding: 10px">学院管理</h1>
    <Table :util="{
    httpUrl:'/college',
    params:'',
    collegename:'学院名称'
  }" :curpage="1" :headhide="4"></Table>
  </div>

</template>


<script>

</script>

<style scoped>

</style>
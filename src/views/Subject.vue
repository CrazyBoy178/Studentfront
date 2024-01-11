<template>
  <div>
    <h1 style="padding: 10px">科目管理</h1>

    <Table :util="{
    httpUrl:'/subject',
    params:'',
    subname:'课程名',
    credit:'学分/学分',
    college:'开设学院//cid',
    teacher:'老师姓名//tid',
  }" :curpage="1" :headhide="4">

    </Table>
  </div>

</template>

<script>

</script>

<style scoped>

</style>
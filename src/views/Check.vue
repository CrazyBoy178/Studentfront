<template>
  <div>
    <h1 style="padding: 10px">选课查看</h1>
    <Table :util="{
    httpUrl:'/choose',
    params:'/choose?uid='+uid,
    subname:'课程名',
    credit:'学分/学分',
    college:'开设学院',
    }" :headhide="13"></Table>
  </div>

</template>

<script>
export default {
  data(){
    return{
      uid:localStorage.getItem('uid'),
    }
  }
}
</script>

<style scoped>

</style>
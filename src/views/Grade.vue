<template>
  <div>
    <h1 style="padding: 10px">成绩查询</h1>
    <Table :util="{
    httpUrl:'/grade',
    params:'/grade?uid='+uid,
    name:'学生姓名',
    subname:'课程名',
    credit: '学分/学分',
    teacher:'老师姓名',
    college:'开设学院',
    grade: '成绩/分',
    }" :curpage="1" :headhide="123"></Table>
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
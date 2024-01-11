<template>
  <div>
    <h1 style="padding: 10px">学生选课</h1>

    <Table :util="{
   httpUrl:'/subject',
    params:'',
    subname:'课程名',
    credit:'学分/学分',
    college:'开设学院',
  }" :headhide="headhide" :curpage="1"
           ref="table">
      <el-button v-if="status==='学生'" @click="xuanke()" type="primary" plain>选课</el-button>
    </Table>

  </div>

</template>

<script>
export default {
  methods:{

    xuanke(){
      console.log(this.$refs.table.row);
      //选中这一行后
      if(this.$refs.table.row){//如果row数据存在
        var params={
          uid: localStorage.getItem('uid'),
          sid: this.$refs.table.row.id,

        };
        this.$http.post('/choose', params).then(resp=>{
          console.log(resp);
          if(resp.data===1){
            alert('选课成功');
          }else{
            alert('你已经选了这门课,请勿重复选择')
          }

        });

      }else{//没有选中任何行
        alert("请选择一个课程");
      }
    },
  },
  mounted()
  {
    this.status = localStorage.getItem('status');
  },
  data(){
    return{
      status:'',//身份变量
      headhide:123,
    }
  },
}
</script>

<style scoped>

</style>
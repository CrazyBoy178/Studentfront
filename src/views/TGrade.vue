<template>
  <div>
    <h1 style="padding: 10px">成绩录入</h1>
    <div class="upload">
      <form action="http://localhost:8080/grade/upload" method="post" enctype="multipart/form-data">


        
        <input type="file" name="file">
        <input type="submit" value="上传成绩表">
      </form>
    </div>
    <Table   :util="{
      httpUrl:'/grade',
      params: '/tgradeById?tid='+uid,
      name:'学生姓名/-1',
      subname:'课程名/-1',
      credit: '学分/-1',
      teacher:'老师姓名/-1',
      college:'开设学院/-1',
      grade: '成绩/分'
      }" :curpage="1" :headhide="1234">
      <el-button type="primary" @click="downloadTemplate">下载模板</el-button>
      <a ref="downloadLink" style="display: none;"></a>
    </Table>
  </div>
</template>

<script>



export default {
  data(){
    return{
      uid:localStorage.getItem('uid'),
      subname:'',
      subnameList:[],
      data:[],
    }
  },
  mounted(){
    this.fetchSubname(this.uid);
    console.log(this.subname);

  },
  methods:{




    downloadTemplate() {
      // 替换为你的后端下载接口路径
      // 设置下载链接和文件名
      this.$refs.downloadLink.href = "http://localhost:8080/grade/download";

      // 模拟点击触发下载
      this.$refs.downloadLink.click();
    },
    // generateTableParams() {
    //   console.log(this.subname)
    //   return `?tid=${this.uid}`+ `&sid=`+this.subname;
    // },
    fetchSubname(value){
      let uid = value;
      this.$http.get(`/grade/getSubname?tid=${uid}`,).then(response =>{
        console.log(response.data);
        this.subnameList = response.data.subname.map(item => ({
          label: item.label,
          value: item.value
        }));
        this.subname = this.subnameList[0].value;
        console.log(this.subnameList[0].value);
      }).catch(error => {
        console.error('Error fetching data:', error);
        alert("该老师没有科目");
      })
    },


  },


}
</script>



<style scoped>
.upload {
  display: inline-block;
  padding: 10px;
}
</style>
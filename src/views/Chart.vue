<template>
  <div>
    <h1 style="padding: 10px">成绩分析</h1>
    <el-select v-model="subname"  @change="fetchData">
      <el-option
          v-for="item in subnameList"
          :value="item">
      </el-option>
    </el-select>
    <el-button @click="download">下载成绩</el-button>
    <div class="chart-container">
      <div id="main" class="chart" style="width:90%;height:400px;"></div>
      <div id="pieChart" class="chart" style="width:90%;height: 400px;"></div>
    </div>

  </div>
</template>

<script>

import * as echarts from 'echarts';
import { saveAs } from 'file-saver';
const XLSX = require('xlsx');

export default {
  data(){
    return{
      uid:localStorage.getItem('uid'),
      subnameList:[],
      subname:'',
      dataform:[],
      subjectTitle: '', // 存储科目标题
    }
  },
  mounted(){

    this.fetchSubname()
    console.log(this.subname)

  },
  methods:{
    download(){
      let uid = this.uid;
      let subname = this.subname;
      this.$http.get(`/grade/downloadGrade?tid=${uid}&subname=${subname}`,).then(response =>{
        console.log(response.data);
        const data = response.data;

        const rows = [
          ["姓名", "成绩", "科目"],
          ...data.map(item => [item.name, item.grade, item.subname])
        ];

        const xlsxData = [
          {
            name: "Sheet1",
            data: rows
          }
        ];
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        // 保存Excel文件
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, subname+".xlsx");

      }).catch(error => {
        console.error('Error fetching data:', error);
        alert("该老师没有科目");
      })
    },

    fetchSubname(){
      let uid = this.uid;
      this.$http.get(`/grade/getSubname?tid=${uid}`,).then(response =>{
        console.log(response.data);
        this.subnameList = response.data.subname.map(item=>item.label);
        this.subname = this.subnameList[0];
        console.log(this.subnameList);
        this.fetchData(this.subname);
      }).catch(error => {
        console.error('Error fetching data:', error);
        alert("该老师没有科目");
      })
    },

    fetchData(value)
    {
      let uid = this.uid;
      let subname = value;

      var myChart1 = echarts.init(document.getElementById('main'));
      var myChart2 = echarts.init(document.getElementById('pieChart'));

      window.addEventListener('resize', function() {
        myChart1.resize();
        myChart2.resize();
      });
      this.$http.get(`/grade/tgrade?tid=${uid}&subname=${subname}`,).then(response =>{
        console.log(response.data)
        this.dataform = response.data;
        // 数据获取成功后统计分数区间
        const scoreRange = []; // 分数区间
        const scoreCount = []; // 区间内的个数
        this.subjectTitle = subname;

        for (let i = 0; i < 100; i += 10) {
          const start = i;
          const end = i + 10;
          scoreRange.push(`${start} - ${end}`);
          const count = this.dataform.filter(item => item.grade > start && item.grade <= end).length;
          scoreCount.push(count);
        }

        // 初始化图表

        var option1 = {
          title: {
            text: `成绩分布图-${this.subjectTitle}`
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: scoreRange // 分数区间作为横轴数据

          },
          yAxis: {
            type: 'value',
            interval: 1 // 设置纵轴刻度为整数

          },
          series: [
            {
              name: '个数',
              type: 'bar',
              data: scoreCount // 区间内的个数作为纵轴数据
            }
          ]
        };

        var passCount = this.dataform.filter(item => item.grade >= 60).length; // 及格人数（60分以上）
        var failCount = this.dataform.length - passCount; // 不及格人数

        var option2 = {
          title: {
            text: '及格人数 vs 不及格人数',
            subtext: `${passCount} 人及格，${failCount} 人不及格`
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            bottom: '10', // 设置底部距离容器底部的距离
            data: ['及格', '不及格']
          },
          series: [
            {
              name: '成绩情况',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: passCount, name: '及格' },
                { value: failCount, name: '不及格' }
              ]
            }
          ]
        };

        myChart1.setOption(option1);
        myChart2.setOption(option2);

      }).catch(error => {
        console.error('Error fetching data:', error);
        alert("该老师没有考试科目")
      });
    },
  },


}

</script>
<style scoped>

.chart-container {
  display: block;
}

.chart {
  //flex: 1;
  margin: 10px;
  border: 1px solid #ccc;
}

</style>
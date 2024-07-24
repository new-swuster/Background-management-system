<template>
  <!-- gutter分栏间隔属性 -->
  <el-scrollbar height="600px">
    <el-row class="home" :gutter="20">
      <!-- 占8列 -->
      <!-- z左侧列 -->
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img src="../../assets/样例图片.png" />
            <div class="userinfo">
              <p class="role">管理员</p>
              <p class="name">小康</p>
            </div>
          </div>
          <div>
            <div class="login-info">
              <p>上次的登陆的时间 <span>2024-7-6</span></p>
              <p>上一次登录地点:<span>四川</span></p>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px" height="450px">
          <el-table :data="tableData">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧列 -->
      <el-col :span="16" style="margin-top: 20px" class="right-num">
        <div class="num">
          <el-card
            :body-style="{ display: 'flex', padding: 0 }"
            v-for="item in CountData"
            :key="item.name"
          >
            <component
              :is="item.icon"
              class="icons"
              :style="{ background: item.color }"
            ></component>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <div id="echart3" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <div id="echart2" style="height: 230px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div style="height: 230px" id="echart1"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
import axios from "axios";
export default defineComponent({
  //echarts图配置
  mounted() {
    var myoption1 = echarts.init(document.getElementById("echart1"));
    var myoption2 = echarts.init(document.getElementById("echart2"));
    var myoption3 = echarts.init(document.getElementById("echart3"));
    let index = 0;
    let data = [
      [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      ],
      [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
      ],
      [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
      ],
      [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
      ],
    ];

    setInterval(function () {
      //1.数组下标++ 切换数据
      index++;
      if (index > 3) {
        //数组最大下标为3,
        index = 0;
      }
      //2.替换数据
      option1.series[0].data = data[index][0];
      option1.series[1].data = data[index][1];
      //3.重新渲染 echarts图表
      myoption1.setOption(option1);
    }, 1500);

    const option1 = {
      //  backgroundColor:'#d4cccc',
      title: {
        text: "实际销售额与预期销售额",
        // 文字颜色
        textStyle: {
          color: "#4c9bfd",
          fontSize: 15,
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["预期销售额", "实际销售额"],
        left: "right",
        textStyle: {
          color: "#4c9bfd",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        // 文字颜色
        axisLabel: {
          color: "#4c9bfd",
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yAxis: {
        /* 刻度为数据最大刻度 */
        max: "dataMax",
        type: "value",
        // 文字颜色
        axisLabel: {
          color: "#4c9bfd",
        },
        //修改刻度颜色
        splitLine: {
          lineStyle: {
            color: "#012f4a",
          },
        },
      },
      series: [
        {
          name: "预期销售额",
          type: "line",
          stack: "总量",
          //曲线
          smooth: true,
          //圆圈大小
          symbolSize: 8,
          itemStyle: {
            color: "#e3973f", // 线颜色
          },
          data: data[0][0],
        },
        {
          name: "实际销售额",
          type: "line",
          stack: "总量",
          //曲线
          smooth: true,
          //圆圈大小
          symbolSize: 8,
          data: data[0][1],
          itemStyle: {
            color: "#67c542",
          },
        },
      ],
    };
    const option2 = {
      // backgroundColor: '#1f4279',
      // color: ['#4CD57D', '#0CE5F3', '#4772E1', '#EFB062', '#4b5cc4', '#fa8c35'],
      title: {
        text: "销售品牌占比",
        // 文字颜色
        textStyle: {
          color: "#4c9bfd",
        },
      },
      tooltip: {
        show: true,

        textStyle: {
          fontSize: 16,
          color: "gray",
        },
        formatter: (params) => {
          var yzg = (params.data.yzg / params.value) * 100;
          var wzg = (params.data.wzg / params.value) * 100;
          return `${params.name}:${params.value}单<br/>
          未支付: ${params.data.yzg}单(${yzg.toFixed(2)}%)<br/>
          已支付: ${params.data.wzg}单(${wzg.toFixed(2)}%)`;
        },
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "30%",
        icon: "rect",
        textStyle: {
          fontSize: 14,
          color: "#494242",
        },
      },
      series: [
        {
          name: "",
          type: "pie",
          center: ["35%", "50%"],
          radius: ["55%", "70%"],
          avoidLabelOverlap: false,

          label: {
            textStyle: {
              fontSize: 14,
              color: "#494242",
            },
          },
          labelLine: {},
          data: [
            { value: 56, name: "oppo", yzg: 40, wzg: 4 },
            { value: 20, name: "vivo", yzg: 35, wzg: 9 },
            { value: 14, name: "苹果", yzg: 5, wzg: 3 },
            { value: 34, name: "小米", yzg: 20, wzg: 5 },
          ],
        },
        {
          name: "",
          type: "pie",
          selectedMode: "single",
          center: ["35%", "50%"],
          radius: [0, "45%"],
          label: {
            position: "inner",
            textStyle: {
              fontSize: 14,
              color: "#fff",
            },
            formatter: (params) => {
              return `${params.name}\n\n${params.value}单`;
            },
          },
          // labelLine: {
          //   show: false
          // },
          data: [
            // 默认和第一个数值相同
            { value: 55, name: "未支付" },
            { value: 6, name: "已支付" },
          ],
        },
      ],
    };
    const pData = {
      oppo: 0,
      vivo: 0,
      苹果: 0,
      小米: 0,
      三星: 0,
      华为: 0,
    };

    setInterval(function () {
      const num = parseInt(Math.random() * 20);
      const arr = Object.keys(pData);
      const index = parseInt(Math.random() * arr.length);
      pData[arr[index]] += num;
      option3.yAxis.data = Object.keys(pData);
      option3.series[0].data = Object.values(pData);
      myoption3.setOption(option3, true);
    }, 750);

    const option3 = {
      // title:'实时售卖情况',
      // textStyle:'gray',
      tooltip: {
        show: true,
      },
      title: {
        text: "实时售卖情况",
        // 文字颜色
        textStyle: {
          color: "#4c9bfd",
        },
      },
      xAxis: {
        max: "dataMax",
        axisLine: {
          lineStyle: {
            color: "#4790ea",
          },
        },
        // x轴的分割线
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        data: Object.keys(pData),
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        axisLine: {
          lineStyle: {
            color: "#4790ea",
          },
        },
        // max: 2 // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          type: "bar",
          data: Object.values(pData),
          label: {
            show: true,
            position: "right",
            valueAnimation: true,
            color: "gray",
          },
          // itemStyle: {
          //     color: 'red' // 设置字体颜色为红色
          // },
          barWidth: 20,
          itemStyle: {
            borderRadius: [0, 10, 10, 0],
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              {
                offset: 0,
                color: "#f72f48",
              },
              {
                offset: 0.5,
                color: "#f44279",
              },
              {
                offset: 1,
                color: "#8815f9",
              },
            ]),
          },
        },
      ],
      legend: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
    };
    var currentIndex = 0;
    var timer = 0;
    function animate() {
      timer = setInterval(function () {
        var dataLen = option2.series[0].data.length;
        // 取消之前高亮的图形
        myoption2.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        myoption2.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        option2.series[1].data[0].value =
          option2.series[0].data[currentIndex].yzg;
        option2.series[1].data[1].value =
          option2.series[0].data[currentIndex].wzg;
        myoption2.setOption(option2, true);
      }, 1000);
    }
    animate();

    myoption2.on("mouseover", function (e) {
      if (e.seriesIndex == 0) {
        clearInterval(timer);
        // 取消之前高亮的图形
        myoption2.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
        });
        myoption2.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
        option2.series[1].data[0].value =
          option2.series[0].data[e.dataIndex].yzg;
        option2.series[1].data[1].value =
          option2.series[0].data[e.dataIndex].wzg;
        myoption2.setOption(option2, true);
      }
    });

    myoption2.on("mouseout", function (e) {
      if (e.seriesIndex == 0) {
        currentIndex = e.dataIndex;
        animate();
      }
    });

    myoption1.setOption(option1);
    myoption2.setOption(option2);
    myoption3.setOption(option3);
    window.addEventListener("resize", () => {
      myoption1.resize();
      myoption2.resize();
    });
  },

  setup() {
    let tableData = ref([]);
    let CountData = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };
    const getTableList = async () => {
      await axios.get("/home/getData").then((res) => {
        tableData.value = res.data.data.tableData;
      });
    };
    const getCountData = async () => {
      await axios.get("/home/getCountData").then((res) => {
        CountData.value = res.data.data.CountData;
      });
    };
    onMounted(() => {
      getTableList();
      getCountData();
    });
    return {
      tableData,
      tableLabel,
      CountData,
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    border-bottom: 1px solid #ccc;
    width: 150px;
    height: 150px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-left: 5px;
    }
  }
  .userinfo {
    padding-left: 120px;
    margin-top: 40px;
  }
}

.login-info {
  p {
    line-height: 30px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      // margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 30%;
    margin-bottom: 15px;
  }
  .icons {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .txt {
      font-size: 14px;
      text-align: center;
      color: #6c6767;
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>

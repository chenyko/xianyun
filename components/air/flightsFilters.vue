<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <!-- 起飞时间段选项 -->
          <!-- label：是显示在列表中的字符串, value是选中时候的值，必须是每个选项不一样字符串 -->
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <!-- 只是为了单纯触发computed的函数调用，不需要显示内容 -->
    <span v-show="false">{{filter}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小

      // 选择机型大小
      airSizeList: [
        { label: "大", type: "L" },
        { label: "中", type: "M" },
        { label: "小", type: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    filter() {
      // console.log(123);
      
      let arr = [];
      arr = this.data.flights.filter(v => {
        // 先假设所有的数据都是符合条件的
        let valid = true;
        //  开始和出发时间段
        const [start, end] = this.flightTimes.split(",");
        // 航班出发的小时
        const current = +v.dep_time.split(":")[0];
        if (
          this.company && this.company != v.airline_name||
          this.airport && this.airport != v.org_airport_name ||
          this.airSize && this.airSize != v.plane_size ||
          this.flightTimes && !(+start <= current && current < +end)
        ) {
          valid = false;
        }
        return valid;
      });
       this.$emit("setDataList", arr);
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {},

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // val 6,12 这种形式的
      // const [start, end] = value.split(","); //[6,12]
      // //  console.log([start,end],555);

      // const arr = this.data.flights.filter(v => {
      //   // console.log(v.dep_time);

      //   const current = v.dep_time.split(":")[0];

      //   // 出发小时必须要小于或者等于选中的开始时间，并且小于选中的结束时间
      //   return +start <= +current && +current < +end;
      // });
      // this.$emit("setDataList", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // const arr = this.data.flights.filter(v => {
      //   return v.airline_name == value;
      // });
      // this.$emit("setDataList", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // const arr = this.data.flights.filter(v => {
      //   return v.plane_size == value;
      // });
      // this.$emit("setDataList", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ""; // 机场
      this.flightTimes = ""; // 出发时间
      this.company = ""; // 航空公司
      this.airSize = ""; // 机型大小
      // 触发传递的事件，修改dataList
      this.$emit("setDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
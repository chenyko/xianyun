<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="handleDepartBlur"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          @blur="handleDestBlur"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      form: {
        departCity: "", // 出发城市
        departCodde: "", // 出发城市代码
        destCity: "", //到达城市
        destCode: "", //到达城市代码
        departDate: "" //出发日期
      },
      currentTab: 0,

      // 出发城市列表
      departCities: [],
      // 到达城市列表
      destCities: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert("目前不支持往返", "提示", {
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      if (!value.trim()) {
        return cb([]);
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.departCities = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        cb(this.departCities);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value.trim()) {
        return cb([]);
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.destCities = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        cb(this.destCities);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      console.log(item);

      
      this.form.departCity = item.value;
      this.form.departCodde = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      // 用于认为输入是正确的，没有选中下拉框，所以需要默认选中第一个
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // 出发城市失去焦点的时候触发
    handleDepartBlur() {
        if(this.departCities.length===0) return
        // 用于认为输入是正确的，没有选中下拉框，所以需要默认选中第一个
         this.form.departCity = this.departCities[0].value;
         this.form.departCodde = this.departCities[0].sort;
    },

    // 到达城市失去焦点的时候触发
    handleDestBlur() {
        
        if(this.destCities.length===0) return
        // 用于认为输入是正确的，没有选中下拉框，所以需要默认选中第一个
         this.form.destCity = this.destCities[0].value;
         this.form.destCode = this.destCities[0].sort;
        //  console.log(this.form.destCode);
         
    },
    // 确认选择日期时触发
    handleDate(value) {
        // moment是一个方法，可以传递时间Date对象。如果不传递参数就会获取当前的时间
        this.form.departDate=moment(value).format('YYYY-MM-DD')
        console.log(this.form.departDate);
        
    },

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 提交表单是触发
    handleSubmit() {}
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>

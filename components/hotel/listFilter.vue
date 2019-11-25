<template>
  <div class="listFilter">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8">
        <div class="priceScale">
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <span>价格</span>
              <span class="amount">0-4000</span>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <div class="block">
                <!-- <span class="demonstration">4000</span> -->
                <el-slider v-model="maxPrice"></el-slider>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="hotelLevel">
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <span>住宿等级</span>
            </el-col>
          </el-row>
          <el-dropdown placement="top-start" @command="handleLevelCommand">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{levelsText}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in hotelData.levels"
                :key="index"
                :command="index"
                :tabindex="item.id"
              >
                <i class="iconfont iconcircle" ref="levels"></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="hotelType">
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <span>住宿类型</span>
            </el-col>
          </el-row>
          <el-dropdown placement="top-start" @command="handleTypeCommand">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{typesText}}</span>

              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in hotelData.types"
                :key="index"
                :command="index"
                :tabindex="item.id"
              >
                <i class="iconfont iconcircle" ref="types"></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="hotelAsset">
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <span>酒店设施</span>
            </el-col>
          </el-row>
          <el-dropdown placement="top-start" @command="handleAssetsCommand">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{assetsText}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in hotelData.assets"
                :key="index"
                :command="index"
              >
                <i class="iconfont iconcircle" ref="assets"></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="hotelBrand">
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <span>酒店品牌</span>
            </el-col>
          </el-row>
          <el-dropdown placement="top-start" @command="handleBrandsCommand">
            <span class="el-dropdown-link">
              <span class="el-dropdown-text">{{brandsText}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item
                v-for="(item,index) in hotelData.brands"
                :key="index"
                :command="index"
              >
                <i class="iconfont iconcircle" ref="brands"></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxPrice: 4000,
      hotelData: {
        assets: [],
        brands: [],
        levels: [],
        types: []
      },
      levelsText: "不限",
      typesText: "不限",
      assetsText: "不限",
      brandsText: "不限"
    };
  },
  methods: {
    handleLevelCommand(command) {
      console.log("点击了" + command);
      //点击菜单项触发的事件回调
      this.ischecked(this.$refs.levels, command);
      let i = 0;
      this.$refs.levels.forEach(e => {
        if (e.classList.contains("iconright-1")) {
          i++;
        }
      });
      if (i >= 2) {
        this.levelsText = `已选${i}项`;
      } else if (i == 1) {
        this.$refs.levels.forEach((e, i) => {
          if (e.classList.contains("iconright-1")) {
            this.levelsText = this.hotelData.levels[i].name;
          }
        });
      } else {
        this.levelsText = "不限";
      }
    },
    handleTypeCommand(command) {
      console.log("点击类型");
      this.ischecked(this.$refs.types, command);
      let i = 0;
      this.$refs.types.forEach(e => {
        if (e.classList.contains("iconright-1")) {
          i++;
        }
      });
      if (i >= 2) {
        this.typesText = `已选${i}项`;
      } else if (i == 1) {
        this.$refs.types.forEach((e, i) => {
          if (e.classList.contains("iconright-1")) {
            this.typesText = this.hotelData.types[i].name;
          }
        });
      } else {
        this.typesText = "不限";
      }
    },
    handleAssetsCommand(command) {
      console.log("点击设施");
      this.ischecked(this.$refs.assets, command);
      let i = 0;
      this.$refs.assets.forEach(e => {
        if (e.classList.contains("iconright-1")) {
          i++;
        }
      });
      if (i >= 2) {
        this.assetsText = `已选${i}项`;
      } else if (i == 1) {
        this.$refs.assets.forEach((e, i) => {
          if (e.classList.contains("iconright-1")) {
            this.assetsText = this.hotelData.assets[i].name;
          }
        });
      } else {
        this.assetsText = "不限";
      }
    },
    handleBrandsCommand(command) {
      console.log("点击品牌");
      this.ischecked(this.$refs.brands, command);
      let i = 0;
      this.$refs.brands.forEach(e => {
        if (e.classList.contains("iconright-1")) {
          i++;
        }
      });
      if (i >= 2) {
        this.brandsText = `已选${i}项`;
      } else if (i == 1) {
        this.$refs.brands.forEach((e, i) => {
          if (e.classList.contains("iconright-1")) {
            this.brandsText = this.hotelData.brands[i].name;
          }
        });
      } else {
        this.brandsText = "不限";
      }
    },
    ischecked(ref, command, data) {
      /*
      1. 将前面的icon更换成选中状态
      2. 当前的icon被选中时，不限的文字更改为相应菜单项文字
      3. 超过两个icon被选中时，不限的文字更改为已选多少项
       */
      if (ref[command].classList.contains("iconcircle")) {
        ref[command].classList.remove("iconcircle");
        ref[command].classList.add("iconright-1");

        // if (this.filterText.indexOf('星')>-1) {
        //   this.filterText = `已选${this.countNum+1}项`
        // }else{
        //   this.filterText = this.hotelData.levels[command].name;
        // }

        // console.log(this.filterText);
      } else {
        ref[command].classList.add("iconcircle");
        ref[command].classList.remove("iconright-1");
      }
    }
  },
  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      //   console.log(res);
      const { data } = res.data;
      // console.log(data);
      this.hotelData = data;
    });
  }
};
</script>

<style scoped lang="less">
.listFilter {
  border: 1px solid #ddd;
  padding: 5px 20px;
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
  box-sizing: border-box;
  .priceScale {
    border-right: 1px solid #ddd;
    padding-right: 20px;
    .amount {
      float: right;
    }
  }
  .el-col-4 {
    border-right: 1px solid #ddd;
    &:last-child {
      border-right: none;
    }
  }
  .hotelLevel,
  .hotelBrand,
  .hotelType,
  .hotelAsset {
    padding: 0px 20px;

    // line-height: 38px;
    .el-row {
      margin-bottom: 10px;
    }
    .el-dropdown {
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      width: 100%;

      .el-dropdown-link {
        flex: 1;
        display: flex;
        border: none;
      }
      .el-dropdown-text {
        flex: 1;
      }
    }
  }
}
.el-dropdown-menu {
  max-height: 230px;
  overflow: auto;
}
/deep/ .el-dropdown-menu__item {
  width: 120px;

  .el-icon-circle-check {
    margin-right: 15px;
  }
}
</style>
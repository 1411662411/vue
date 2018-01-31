<template>
  <div>
        <Dingbu :nameTitle='PageName' :refresh="RefreshName"></Dingbu>
        <div class="w">
            <!-- 添加 -->
            <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;background-color: rgba(243, 243, 243, 1);text-align:left;margin-top:20px;">
                <el-button   
                    @click="add"
                    style="float:right;margin:10px 20px 9px 0;padding:7px 25px;border-radius:0;">
                    添加
                </el-button>
            </div>

            <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="物流公司名称"
            align="center"
            width="281">
          </el-table-column>
          <el-table-column
            prop="name"
            label="计费方式"
            align="center"
            width="373">
          </el-table-column>
          <el-table-column 
            prop="cover" 
            label="是否启用" 
            width="137">
            <template slot-scope="scope">
              <img :src="scope.row.cover"/>
            </template>
          </el-table-column>
          <el-table-column
            width="305"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click="edit(scope.$index, tableData,scope.row.id)">
                编辑
              </a>
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click="del(scope.$index, tableData,scope.row.id)">
                删除
              </a>
            </template>
          </el-table-column>
        </el-table>
        </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import {mapGetters, mapMutations, mapActions} from 'vuex';
import { ship } from '../../api/orders/Order.js';
export default {
    data() {
        return {
            PageName: '物流公司',
            RefreshName: '刷新',
            tableData: [],
        }
    },
    computed : {
        ...mapGetters(['token'])
    },
    methods: {
        add() {

        },
        edit() {

        },
        del() {

        },
        getData() {
            ship({params: {token: localStorage.getItem("data")}}).then(res => {
                console.log(res)
            })
        }
    },
    components: {
        Dingbu
    },
    created() {
        this.getData();
    }
}
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>

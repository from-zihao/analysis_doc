<template>
  <div id="analysis_main">

    <!-- TODO 导航栏开始 -->
    <div class="top_nav">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <template>
          <el-link :underline="false" style="float: left">
            <img style="float:left;margin-left: 20px;margin-top: 6px;width: 50px;height: 50px"
                 src="../assets/img/wps.png">
            <span
              style="float: left;margin-left: 7px;font-size: 28px;color: white;line-height: 60px"><strong>解析文档</strong></span>
          </el-link>

        </template>
        <el-menu-item index="2" style="float: right;" disabled><i class="el-icon-user-solid"></i>登&nbsp;&nbsp;录
        </el-menu-item>
      </el-menu>
    </div>
    <!-- TODO 导航栏结束 -->

    <div class="analysis_body">
      <!-- TODO 左菜单开始 -->
      <div class="left_menu">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!--          <el-submenu index="1">-->
          <!--            <template slot="title">-->
          <!--              <i class="el-icon-location"></i>-->
          <!--              <span>导航一</span>-->
          <!--            </template>-->
          <!--                        <el-menu-item-group>-->
          <!--                          <template slot="title">分组一</template>-->
          <!--                          <el-menu-item index="1-1">选项1</el-menu-item>-->
          <!--                          <el-menu-item index="1-2">选项2</el-menu-item>-->
          <!--                        </el-menu-item-group>-->
          <!--                        <el-menu-item-group title="分组2">-->
          <!--                          <el-menu-item index="1-3">选项3</el-menu-item>-->
          <!--                        </el-menu-item-group>-->
          <!--                        <el-submenu index="1-4">-->
          <!--                          <template slot="title">选项4</template>-->
          <!--                          <el-menu-item index="1-4-1">选项1</el-menu-item>-->
          <!--                        </el-submenu>-->
          <!--          </el-submenu>-->
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- TODO 左菜单结束 -->

      <!-- TODO 右主题开始 -->
      <div class="right_body">
        <div class="body_top"></div>
        <div class="body_main">
          <div class="body_left"></div>
          <div class="body_right_2"></div>
          <div class="body_right">
            <div class="body_right_head">
              <!--              <el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
              <div class="submit_box">
                <el-button type="primary" icon="el-icon-upload el-icon--right" @click="card_visible = true">上传
                </el-button>
              </div>
              <el-dialog title="上传DOC文档" :visible.sync="card_visible" :modal=false style="text-align: left">
                <el-form :model="form">
                  <el-form-item :label-width="formLabelWidth">
                    <el-upload ref="uploadWord" :action=url.upload_file_url :limit=limitNum
                               :auto-upload="false" accept=".doc" :before-upload="beforeUploadFile"
                               :on-change="fileChange" :on-exceed="exceedFile" :on-success="handleSuccess"
                               :on-error="handleError" :file-list="fileList">
                      <el-button size="small" plain>选择文件</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传doc文件，且不超过10M</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
                    <el-button size="small" @click="cancel_upload">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <div class="submit_box">
                <el-button type="primary" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
              </div>
              <div class="input_box">
                <el-input placeholder="请输入姓名" v-model="input1" clearable></el-input>
              </div>
              <div class="input_box">
                <el-input placeholder="请输入日期" v-model="input2" clearable></el-input>
              </div>
              <div class="input_box">
                <el-input placeholder="请输入学历" v-model="input3" clearable></el-input>
              </div>
              <div class="submit_box">
                <el-button type="primary" icon="el-icon-search" @click="searchSome">搜索</el-button>
              </div>
              <div class="submit_box">
                <el-button type="primary" icon="el-icon-delete" @click="reset_input_box">重置</el-button>
              </div>
            </div>
            <div class="body_right_main">
              <el-table ref="multipleTable" :data="currentPageData" tooltip-effect="dark" style="width: 100%"
                        height="97.6%" @selection-change="handleSelectionChange">

                <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                <el-table-column sortable prop="date" label="日期" width="120">
                  <!--                  <template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column sortable prop="name" label="姓名" width="120"></el-table-column>
                <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip -->
                <el-table-column sortable prop="address" label="地址" width="300"></el-table-column>
                <el-table-column sortable prop="date" label="日期" width="120"></el-table-column>
                <el-table-column sortable prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column sortable prop="address" label="地址" width="300"></el-table-column>

                <el-table-column fixed="right" label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="edit_file = true">编辑</el-button>
                    <el-button @click="singleDelete(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 查看详情弹出框 -->
              <el-dialog width="80%" title="详情信息" :visible.sync="detail_file" :modal=false style="text-align: left">

              </el-dialog>

              <!-- 编辑弹出框 -->
              <el-dialog width="80%" title="编辑" :visible.sync="edit_file" :modal=false style="text-align: left">

              </el-dialog>
            </div>
            <div class="body_right_foot">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="currentDataNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO 右主题结束 -->
    </div>

  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: "AnalysisDoc",
    data() {
      return {
        // tableData: [],
        // 可以通过后台接收数据后，将下面的数据删除，改为上面注释的样子
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          },
          {
            date: '2016-05-03',
            name: '王大虎',
            address: '上海市普陀区金沙江路 1342 弄'
          }
        ],
        currentPage: 1,
        currentDataNum: 10,
        currentPageData: [],
        activeIndex: '1',
        multipleSelection: [],
        card_visible: false,
        detail_file: false,
        edit_file: false,
        input1: '',
        input2: '',
        input3: '',
        url: {
          upload_file_url: "",
          search_some_url: "",
          batch_delete_url: "",
          single_delete_url: "",
          doc_info_url: "",
        },
        limitNum: 1,
        formLabelWidth: '80px',
        form: {
          file: ''
        },
        fileList: []
      }
    },
    methods: {
      // 文件超出个数限制时的钩子
      exceedFile(files, fileList) {
        this.$notify.warning({
          title: '警告',
          message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
        });
      },
      // 文件状态改变时的钩子
      fileChange(file, fileList) {
        console.log('change')
        console.log(file)
        this.form.file = file.raw
        console.log(this.form.file)
        console.log(fileList)
      },
      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        console.log('before upload')
        console.log(file)
        let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
        let size = file.size / 1024 / 1024
        if (extension !== 'doc') {
          this.$notify.warning({
            title: '警告',
            message: `只能上传后缀是.doc的文件`
          });
        }
        if (size > 10) {
          this.$notify.warning({
            title: '警告',
            message: `文件大小不得超过10M`
          });
        }
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        this.$notify.success({
          title: '成功',
          message: `文件上传成功`
        });
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$notify.error({
          title: '错误',
          message: `文件上传失败`
        });
      },
      // 上传文件
      uploadFile() {
        var _self = this;
        this.$refs.uploadWord.submit()
        // 将文件放到FormData对象中，传到后台
        let formData = new FormData()
        // formData.append('file', this.form.file)
        // axios.post(_self.url.upload_file_url,
        //   formData,
        //   { "Content-Type": "multipart/form-data" }
        // )
        // .then(res => {
        //   console.log('res')
        //   console.log(res)
        // })
        // .catch(err => {
        //
        // })

      },
      // 取消上传
      cancel_upload() {
        var _self = this;
        _self.card_visible = false;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      batchDelete() {
        // 批量删除
        let _self = this;
        console.log(_self.multipleSelection)
        // // ajax请求，get，post都可以
        // axios.get(_self.url.batch_delete_url).then(function (result) {
        //   // 接口返回结果
        //   console.log(result)
        // }).catch(function (error) {
        //   // 错误信息
        //   console.log(error)
        // })
      },
      singleDelete(row) {
        // 单个删除
        let _self = this;
        console.log(row)
        // // ajax请求，get，post都可以
        // axios.get(_self.url.single_delete_url).then(function (result) {
        //   // 接口返回结果
        //   console.log(result)
        // }).catch(function (error) {
        //   // 错误信息
        //   console.log(error)
        // })
      },
      handleClick(row) {
        let _self = this;
        _self.detail_file = true;
        console.log(row);
      },
      handleSizeChange(val) {
        let _self = this;
        console.log(`每页 ${val} 条`);
        _self.currentDataNum = val;
        _self.get_pagination();
      },
      handleCurrentChange(val) {
        let _self = this;
        console.log(`当前页: ${val}`);
        _self.currentPage = val;
        _self.get_pagination();
      },
      // 获取当前页信息
      get_pagination: function () {
        let _self = this;
        let temp = [];
        let table_data = []
        for (let i = (_self.currentPage - 1) * _self.currentDataNum; i < _self.currentPage * _self.currentDataNum; i++) {
          temp.push(i)
        }
        if (_self.tableData.length > _self.currentPage * _self.currentDataNum) {
          for (let i = 0; i < temp.length; i++) {
            table_data.push(_self.tableData[temp[i]])
          }
        } else {
          for (let i = temp[0]; i < _self.tableData.length; i++) {
            table_data.push(_self.tableData[i])
          }
        }
        _self.currentPageData = table_data;
      },
      reset_input_box: function () {
        let _self = this;
        _self.input1 = '';
        _self.input2 = '';
        _self.input3 = '';
      },
      // 搜索方法
      searchSome() {
        let _self = this;
        // // ajax请求，get，post都可以
        // axios.get(_self.url.search_some_url).then(function (result) {
        //   // 接口返回结果
        //   console.log(result)
        // }).catch(function (error) {
        //   // 错误信息
        //   console.log(error)
        // })
        console.log(_self.input1)
        console.log(_self.input2)
        console.log(_self.input3)
      },
      // 获取全部文档内容，将内容放在tableData中
      get_doc_info() {
        var _self = this;
        // // 获取数据
        // // ajax请求，get，post都可以
        // axios.get(_self.url.doc_info_url).then(function (result) {
        //   // 接口返回结果
        //   console.log(result)
        // }).catch(function (error) {
        //   // 错误信息
        //   console.log(error)
        // })
      }
    },
    mounted() {
      let _self = this;
      _self.get_doc_info()
      _self.get_pagination();
    }
  }
</script>

<style>
  .el-table td, .el-table th {
    padding: 10px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }

  /* 全选框颜色 */
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
</style>
<style scoped>
  @import "../assets/css/ayalysisDoc.css";

  .body_right_head * {
    display: inline-block;
  }
</style>

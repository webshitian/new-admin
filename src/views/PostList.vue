<template>
   <div>
   <!-- data: 列表的数据对象 -->
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom:20px;">
   <!-- 表格的列 -->
    <!-- label：标签 -->
    <el-table-column
      label="序号"
      width="60">

      <!-- scope.row：数组中当前列的数据对象 -->
      <template slot-scope="scope">
        <span>{{scope.$index + 1}}</span>
      </template>
    </el-table-column> 

     <el-table-column
      label="标题"
      width="300">
      <template slot-scope="scope">
        <span>{{scope.row.title}}</span>
      </template>
    </el-table-column>

    <el-table-column 
    label="显示"
    width="180"
    >
      <template slot-scope="scope">
        <span>{{scope.row.open === 1 ? '打开' : '关闭'}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="类型"
      width="180">
      <template slot-scope="scope">
        <span>{{scope.row.type === 1 ? '文章': '视频'}}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <!-- 编辑open这个字段 -->
        <el-button
          size="mini"
          :type="scope.row.open === 0 ? 'success':'danger'"
          @click="handleDelete(scope.$index,scope.row)">
          {{scope.row.open === 0 ? '打开' : '关闭'}}
          </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <!-- size-change：条数切换时候触发的函数
  current-change：当前页数切换时候触发的函数
  current-page：当前的页数
  page-sizes：页面条数的列表
  page-size: 当前页面的条数
  layout：布局列表，默认就行
  total：全部的条数 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageIndex"
    :page-sizes="[5, 10, 15]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>

  </div> 
</template>

<script>
export default {
  data() {
      return {
        tableData: [],
        pageIndex: 1,
        pageSize: 5,
        total:0
      }
    },
    methods: {
      // index是索引， row是对象
      handleEdit(index, row) {
        console.log(index, row);
        //跳转到编辑页
       this.$router.push("/post_edit/" + row.id);
      },

      //关闭或者打开文章
      handleDelete(index, row) {
        // console.log(index, row);
        
        //编辑文章的打开状态
        this.$axios({
          url:"/post_update/" + row.id,
          method:'POST',
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || `{}`).token
          },
          data:{
            //给open取反，要么是0,要么是1
            //open:row.open === 1 ? 0 : 1
            open:Number(!row.open)
          }
        }).then(res => {
          //重新请求列表的数据
          this.getList();
        })
      },
       //条数切换时候触发
      handleSizeChange(val){
        // console.log(val)
        this.pageSize = val;
        //请求文章列表的数据
        this.getList();
      },
      // 切换页数时候触发
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex = val;
        //请求文章列表的数据
        this.getList();
      },

      //请求文章列表的数据
      getList(){
        //请求文章列表
        this.$axios({
          url:`/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        }).then(res => {
          const {data} = res.data;
          
          this.tableData = data;
        })
      }
    },

     mounted(){
    
    //请求文章列表的数据
    this.getList();

    //获取数据的总条数，只针对当前这个项目
    //请求文章列表
     this.$axios({
          url: `/post?pageIndex=${this.pageIndex}&pageSize=9999`
        }).then(res => {
          const {data} = res.data;
          // 设置条数
          this.total = data.length;
        })
   }   
}
</script>

<style>

</style>

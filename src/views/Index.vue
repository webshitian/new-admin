<template>
  <el-container class="container">
        <!-- 侧边栏 -->
        <el-aside width="200px">
            <div class="logo">
                新浪新闻
            </div>

            <!-- default-active：当前高亮选中的菜单 -->
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">

                <!-- index是一标识，给default-actives使用的 -->
                <el-submenu index="1">
                    <!-- slot="title"必须要保留 -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <router-link to="/post_list">文章列表</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/post_add">发布文章</router-link>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧的内容部分 -->
        <el-container>
            <!-- 头部 -->
            <el-header>
                <img :src="$axios.defaults.baseURL + user.user.head_img" alt="" class="head">
                <span>{{ user.user.nickname }}</span>
                <span>退出</span>
            </el-header>
            <!-- 子页面显示的内容 -->
            <el-main>
                <div>{{breaks}}</div>
                <!--显示子路由匹配的页面-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
     data(){
        return {
            user: JSON.parse(localStorage.getItem("user") || `{}` )
        }
    },
    //监听url地址的变化，watch页面以加载时候不会执行，只有等到url变化时候才会执行
    // watch:{
    //     $route(){
    //         const {matched} = this.$route;
    //         const arr = [];
            
    //         matched.forEach(v => {
    //             arr.push(v.meta)
    //         })

    //         this.breaks = arr.join("/")
    //     }
    // },

    //computed里面的函数监听到函数中引用的所有实例下的属性的变化
    computed:{
        breaks(){
            const {matched} = this.$route;
            const arr = [];
            
            matched.forEach(v => {
                arr.push(v.meta)
            })

            return arr.join("/");
        }
    },
    mounted(){
    }
}
</script>

<style scoped lang="less">
 .el-header, .el-footer {
    background-color: #eee;
    color: #333;
    line-height: 60px;
  }
  .el-header{
      text-align: right;
      *{
          vertical-align: middle;
      }
      .head{
          width:38px;
          height:38px;
          border-radius: 50%;
          border:1px #999 solid;
      }
      span{
          margin-left:10px;
      }
  }
  
  .el-aside {
    background-color: #333;
    color: #333;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
  }
  
  .container {
    position: absolute;
    top:0;
    bottom:0;
    width:100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

.logo{
    height: 60px;
    width:200px;
    line-height: 60px;
    text-align: center;
    font-size:18px;
    color:#eee;
}
</style> 

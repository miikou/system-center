<template>
    <div class="layout main">
        <Layout class="main">
            <Header>
                <Row>
                    <Col span="12">
                        <h3 class="header-title">
                            <Icon type="md-apps" size="22"/>
                            SYSTEM CENTER
                        </h3></Col>
                    <Col span="12" style="text-align: right; font-size: 16px; cursor: pointer;">
                        <Icon type="ios-contact" size="22"/>
                        <!-- <span>  {{ userName }}</span> -->
                        <Dropdown trigger="click" style="margin-left: 10px; text-align:left;" @on-click="handleClick">
                            <a href="javascript:void(0)">
                                <span>  {{ userName }}</span>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="1">重置密码</DropdownItem>
                                <DropdownItem name="2">退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
            <Sider hide-trigger :style="{background: '#fff'}" class="sidebar-menu">
                <Menu active-name="1" theme="light" width="auto" :open-names="['1']" :accordion="true">
                    <MenuItem name="1">用户管理</MenuItem>
                </Menu>
                <div :style="{padding: '24px', height: '100%', background: '#fff'}" class="sidebar-content">
                    <router-view/>
                </div>
            </Sider>
            
        </Layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectList:[],
                selectVal: "",
                userName: sessionStorage.getItem('userName')
            }
        },
        methods: {
            handleClick(name) {
                if(name == "2") {
                    window.sessionStorage.setItem('token', "")
                    let url = window.location.origin
                    window.location.href = url
                }
            },
            change() {

            }
        }
    }
</script>

<style lang="less" scoped>
.main {
    overflow: hidden;
    width: 100%;
    min-height: 100%;
    background: #f4f6fd;
    box-sizing: border-box;
}
    .ivu-menu-horizontal.ivu-menu-light:after {
        background: white;
    }
    .ivu-layout-header {
        background: white;
        padding: 0 50px;
        height: 64px;
        line-height: 64px;
        margin-bottom: 8px;
        width: 100%;
    }
    .sidebar-menu {
        position: fixed;
        top: 72px;
        left: 16px;
        z-index: 10;
        height: 100%;
        padding-bottom: 72px;
        box-sizing: border-box;
        transition: all .5s;
    }
    .sidebar-content {
        position: fixed;
        top: 72px;
        left: 224px;
        z-index: 10;
        height: 100%;
        width: calc(100% - 202px);
        padding-bottom: 72px;
        box-sizing: border-box;
        transition: all .5s;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .user_name {
        position: relative;
        text-align: right;
    }
    
    // .DropdownItem {
    //     position: fixed;
    //     top: 46px;
    //     right: 20px;
    //     text-align: left;
    // }
    // .layout-logo{
    //     width: 100px;
    //     height: 30px;
    //     background: #5b6270;
    //     border-radius: 3px;
    //     float: left;
    //     position: relative;
    //     top: 15px;
    //     left: 20px;
    // }
    // .layout-nav{
    //     width: 420px;
    //     margin: 0 auto;
    //     margin-right: 20px;
    // }
</style>
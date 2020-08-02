<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">System Center</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>-->
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>-->
                <!-- 用户头像 -->
                <div class="user-avator">
                    <i class="el-icon-s-custom"></i>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="resetPassword">重置密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <Modal v-model="updateModal" :title="'重置密码'" @on-cancel="cancel">
            <div style="text-align:center">
                <Form ref="userForm" :model="formUser" :label-width="100" :rules="rules">
                    <!-- <FormItem label="销售人员名称" prop="realName">
                        <Input type="text" v-model="formUser.realName"></Input>
                    </FormItem>-->
                    <FormItem label="登陆名" prop="userName">
                        <Input type="text" v-model="formUser.userName" readonly></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input type="text" v-model="formUser.password"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button
                    type="error"
                    :loading="modal_loading"
                    @click="cancel"
                    class="btn_delete"
                    style="margin-right: 30px;"
                >取消</Button>
                <Button
                    type="primary"
                    :loading="modal_loading"
                    @click="confirmEdit"
                    class="btn_add"
                >保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        // const realName = (rule, value, callback) => {
        //     if (!value) {
        //         callback(new Error('销售人员名称不能为空'));
        //     } else {
        //         callback();
        //     }
        // };
        // const userName = (rule, value, callback) => {
        //     if (!value) {
        //         callback(new Error('用户名不能为空'));
        //     } else {
        //         callback();
        //     }
        // };
        const password = (rule, value, callback) => {
            if (!value) {
                callback(new Error('密码不能为空'));
            } else {
                callback();
            }
        };
        return {
            updateModal: false,
            collapse: true,
            fullscreen: false,
            modal_loading: false,
            message: 2,
            formUser: {
                // realName: '',
                userName: sessionStorage.getItem('userName'),
                password: ''
            },
            rules: {
                // userName: [
                //     { required: true, validator: userName, trigger: 'blur' },
                // ],
                password: [{ required: true, validator: password, trigger: 'blur' }]
            }
        };
    },
    computed: {
        username() {
            return sessionStorage.getItem('realName');
        }
    },
    methods: {
        confirmEdit() {
            this.$refs['userForm'].validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        this.$http
                            .post('sysUser/update', Object.assign(this.formUser, { id: this.isEdit }))
                            .then(res => {
                                this.init();
                                this.$Message.success('修改成功');
                                this.updateModal = false;
                            })
                            .catch(err => {
                                this.$Message.error('修改失败');
                            });
                    } else {
                        this.$http
                            .post('sysUser/add', this.formUser)
                            .then(res => {
                                this.init();
                                this.$Message.success('添加成功');
                                this.updateModal = false;
                            })
                            .catch(err => {
                                this.$Message.error('添加失败');
                            });
                    }
                }
            });
        },
        cancel() {
            this.updateModal = false;
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            } else {
                this.updateModal = true;
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 20px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 60px;
}
.header .logo {
    float: left;
    /* width: 250px; */
    line-height: 60px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 60px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>

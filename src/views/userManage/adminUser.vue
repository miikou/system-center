<template>
    <div>
        <div class="btn_top">
            <Button type="primary" class="btn_add" @click="addOredit">新建</Button>
            <Button type="error" class="btn_delete" @click="deleteUser">删除用户</Button>
        </div>
        <div>
            <Table
                max-height="400"
                :columns="columns"
                :data="userList"
                @on-selection-change="selectUser"
            ></Table>
            <Page
                :total="pageTotal"
                show-total
                show-sizer
                @on-page-size-change="changeSize"
                @on-change="changePage"
                class="page"
            />
        </div>
        <Modal v-model="deleteModal" title="删除" @on-ok="comfirmDelete" @on-cancel="cancel">
            <div style="text-align:center">
                <p slot="header" style="color:#f60;text-align:center;font-size:16px;">
                    <Icon type="ios-information-circle"></Icon>
                    <span>{{ isDeleteUer ? '确定删除用户？' : '确定删除资料？' }}</span>
                </p>
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
                    @click="comfirmDelete"
                    class="btn_add"
                >确认</Button>
            </div>
        </Modal>
        <Modal v-model="updateModal" :title="addTitle" @on-cancel="cancel">
            <div style="text-align:center">
                <Form ref="userForm" :model="formUser" :label-width="110" :rules="rules">
                    <FormItem label="销售人员名称" prop="realName">
                        <Input type="text" v-model="formUser.realName" placeholder="请输入销售人员名称"></Input>
                    </FormItem>
                    <FormItem label="用户名" prop="userName">
                        <Input type="text" v-model="formUser.userName" placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input type="text" v-model="formUser.password" placeholder="请输入密码"></Input>
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
import { userColumns } from './columns.js';
import axios from 'axios';
import request from '../../utils/request';
export default {
    name: 'userList',
    data() {
        const realName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('销售人员名称不能为空'));
            } else {
                callback();
            }
        };
        const userName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('用户名不能为空'));
            } else {
                callback();
            }
        };
        const password = (rule, value, callback) => {
            if (!value) {
                callback(new Error('密码不能为空'));
            } else {
                callback();
            }
        };
        return {
            isDeleteUer: 0,
            selectUserIds: [],
            userId: '',
            addTitle: '新建',
            modal_loading: false,
            deleteModal: false,
            updateModal: false,
            formUser: {
                realName: '',
                userName: '',
                password: ''
            },
            initPage: {
                pageNumber: 1,
                pageSize: 10
            },
            pageTotal: 0,
            columns: userColumns.bind(this)(),
            userList: [],
            rules: {
                realName: [{ required: true, validator: realName, trigger: 'blur' }],
                userName: [{ required: true, validator: userName, trigger: 'blur' }],
                password: [{ required: true, validator: password, trigger: 'blur' }]
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        download(params) {
            // window.location.href="http://192.168.3.3:8080/cloud-platform/custList/downloadFile?id="+params.row.id;
            request({
                url: 'http://47.52.230.11:5033/api/custList/downloadFile?id=' + params.row.id,
                responseType: 'arraybuffer',
                method: 'get'
            }).then(res => {
                let blob = new Blob([res.data], {
                    type: 'application/vnd.ms-excel;charset=utf-8'
                });
                let url = window.URL.createObjectURL(blob);
                // 生成一个a标签
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                // 生成时间戳
                let timestamp = new Date().getTime();
                link.download = 'data_' + timestamp + '.xls';
                document.body.appendChild(link);
                link.click();
            });
        },
        uploadBefore() {},
        uploadSuccess(response) {
            if (response.code == '500') {
                this.$Message.error(response.msg);
            } else {
                this.$Message.success(response.msg);
            }
            // this.$refs.form.clearValidate('path')
            this.init();
        },
        uploadError() {
            this.$Message.error('上传失败');
            this.$refs.form.clearValidate('path');
        },
        addOredit(params) {
            if (params) {
                this.isEdit = params.id;
                this.addTitle = '编辑';
                this.formUser.userName = params.userName;
                this.formUser.realName = params.realName;
                this.formUser.password = params.password;
            } else {
                this.isEdit = '';
                this.addTitle = '新建';
                this.formUser.userName = '';
                this.formUser.realName = '';
                this.formUser.password = '';
            }
            this.updateModal = true;
        },
        edit() {
            this.updateModal = true;
        },
        deleteUser() {
            if (this.selectUserIds.length == 0) {
                this.$Message.error('请选择删除的用户');
                return;
            }
            this.isDeleteUer = 1;
            this.deleteModal = true;
        },
        deleteFile(id) {
            this.isDeleteUer = 0;
            this.userId = id;
            this.deleteModal = true;
        },
        ok() {},
        cancel() {
            this.deleteModal = false;
            this.updateModal = false;
        },
        selectUser(user) {
            this.selectUserIds = [];
            user.map(item => {
                this.selectUserIds.push(item.id);
            });
        },
        comfirmDelete() {
            if (this.isDeleteUer) {
                if (!this.selectUserIds) {
                    this.$Message.error('请选择删除的用户!');
                }
                this.$http
                    .post('sysUser/delete', { ids: this.selectUserIds })
                    .then(res => {
                        if (res.code == 500) {
                            this.$Message.error(res.msg);
                        } else {
                            this.$Message.success('删除成功');
                            this.init();
                            this.selectUserIds = [];
                        }
                    })
                    .catch(err => {
                        this.$Message.error('删除失败');
                    });
            } else {
                this.$http
                    .post('custList/delete', { userId: this.userId })
                    .then(res => {
                        if (res.code == 500) {
                            this.$Message.error(res.msg);
                        } else {
                            this.$Message.success('删除成功');
                            this.init();
                        }
                    })
                    .catch(err => {
                        this.$Message.error('删除失败');
                    });
            }
            this.deleteModal = false;
        },
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
        init() {
            this.$http.get('sysUser/list', this.initPage).then(res => {
                this.userList = res.data.content;
                this.pageTotal = res.data.totalSize;
            });
        },
        changeSize(value) {
            this.initPage.pageSize = value;
            this.$http.get('sysUser/list', this.initPage).then(res => {
                this.userList = res.data.content;
                this.pageTotal = res.data.totalSize;
            });
        },
        changePage(value) {
            this.initPage.pageNumber = value;
            this.$http.get('sysUser/list', this.initPage).then(res => {
                this.userList = res.data.content;
                this.pageTotal = res.data.totalSize;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.ivu-btn {
    font-size: 14px;
    height: 34px;
    padding: 3px 23px;
}
.btn_top {
    margin-bottom: 14px;

    .btn_add {
        font-size: 14px;
        height: 34px;
        padding: 3px 23px;
    }
    .btn_delete {
        color: #fff;
        background-color: #ff6f4b;
        border-color: #ff6f4b;
        font-size: 14px;
        height: 34px;
        padding: 3px 23px;
        margin-left: 40px;
    }
}

.ivu-modal-content {
    padding: 20px 10px;
}
.ivu-modal-header,
.ivu-modal-footer {
    border: none;
}
.page {
    text-align: right;
    margin-top: 30px;
}
.ivu-upload-list {
    margin-top: 0 !important;
}
</style>
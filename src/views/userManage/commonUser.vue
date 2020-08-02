<template>
    <div class="user_info">
        <Form
            ref="userInfo"
            :label-width="70"
            :model="formUser"
            label-position="right"
            :rules="ruleValidate"
            class="user_form"
            v-if="formUser!=null"
        >
            <FormItem label="序号：">
                <Input v-model="formUser.indexNo" readonly></Input>
            </FormItem>
            <FormItem label="姓名：">
                <Input v-model="formUser.name" readonly></Input>
            </FormItem>
            <FormItem label="手机号：">
                <Input v-model="formUser.phoneNumber" readonly icon></Input>
            </FormItem>
            <FormItem label="邮箱：">
                <Input v-model="formUser.email" readonly></Input>
            </FormItem>
            <FormItem label="标签：" prop="label">
                <RadioGroup v-model="formUser.label" type="button" class="label">
                    <Radio label="0">停机</Radio>
                    <Radio label="1">空号</Radio>
                    <Radio label="2">未接</Radio>
                    <Radio label="3">加微信</Radio>
                    <Radio label="4">准客户</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <div style="display: flex; justify-content: space-between;">
                    <Button type="primary" style="width:200px;" @click="submit">提交</Button>
                    <div>
                        <Button v-if="isMobile && mobileLength.length<=1">
                            <a :href="'tel:'+mobileLength[0]">拨号</a>
                        </Button>
                        <Button v-else @click="selectMobile">拨号</Button>
                    </div>
                </div>
            </FormItem>
            <Modal v-model="deleteModal" title="选择号码" @on-cancel="cancel">
                <div style="text-align:center">
                    <div>
                        <div v-for="item in mobileLength" style="margin-bottom:14px;">
                            <Button>
                                <a :href="'tel:'+item">{{ item }}</a>
                            </Button>
                        </div>
                    </div>
                </div>
                <div slot="footer">
                    <Button
                        type="error"
                        @click="cancel"
                        class="btn_delete"
                        style="margin-right: 30px;"
                    >取消</Button>
                </div>
            </Modal>
        </Form>

        <div v-else>恭喜您！所有客户数据已处理完毕！</div>
    </div>
</template>

<script>
export default {
    name: 'editUser',
    data() {
        return {
            deleteModal: false,
            ruleValidate: {
                label: [{ required: true, message: '请选择状态', trigger: 'change' }]
            },
            formUser: {
                indexNo: '',
                name: '',
                phoneNumber: '',
                email: '',
                id: '',
                label: ''
            }
        };
    },
    computed: {
        isMobile() {
            let flag = navigator.userAgent.match(/(phone|iPhone|ios|iPad|Android|Mobile)/i);
            console.log(flag);
            return flag;
        },
        mobileLength() {
            let mobiles = this.formUser.phoneNumber.split('/');
            // let mobiles = num.split('/');
            let arr = [];
            for (let i = 0; i < mobiles.length; i++) {
                if (/^1[3456789]\d{9}$/.test(mobiles[i])) {
                    arr.push(mobiles[i]);
                }
            }
            return arr;
        }
    },
    created() {
        this.init();
    },
    methods: {
        selectMobile() {
            this.deleteModal = true;
        },
        comfirmDelete() {
            this.deleteModal = false;
        },
        cancel() {
            this.deleteModal = false;
        },
        submit() {
            this.$refs['userInfo'].validate(valid => {
                if (valid) {
                    this.$http
                        .post('custList/update', { label: this.formUser.label, id: this.formUser.id })
                        .then(res => {
                            this.init();
                            this.$Message.success('提交成功!');
                        })
                        .catch(err => {
                            this.$Message.error('提交失败!');
                        });
                } else {
                    this.$Message.error('提交失败!');
                }
            });
        },
        init() {
            this.$http.get('custList/getSingleInfo').then(res => {
                let data = res.data;
                if (data) {
                    this.formUser = data;
                } else {
                    this.formUser = null;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.user_info {
    width: 500px;
    padding: 20px 0;
    margin: 60px auto;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.7);
    overflow: hidden;
    .user_form {
        width: 400px;
        margin: 0 auto;
    }
    .ivu-radio-group-item {
        margin-right: 20px;
    }
    .label .ivu-radio-group-item {
        margin-right: 0;
    }
}

@media screen and (max-width: 480px) and (min-width: 320px) {
    .user_info {
        width: 100% !important;
        padding: 20px 0;
        margin: 60px auto;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.7);
        overflow: hidden;
        .user_form {
            width: 350px;
            margin: 0 auto;
        }
        .ivu-radio-group-item {
            margin-right: 20px;
        }
        .label .ivu-radio-group-item {
            margin-right: 0;
        }
    }
}
</style>
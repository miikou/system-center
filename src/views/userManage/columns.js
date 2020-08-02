
export function userColumns() {
    return [
        {
            type: 'selection',
            width: '55',
            align: 'center'
        },
        {
            title: '序号',
            width: '70',
            align: 'center',
            key: 'index',
            render: (h, params) => {
                return h('span', {}, ++params.index);
            }
        },
        {
            title: '销售人员名称',
            width: "130",
            key: 'realName'
        },
        {
            title: '用户名',
            key: 'userName'
        },
        {
            title: '密码',
            key: 'password'
        },
        {
            title: '资料情况',
            width: '100',
            key: 'dataInfo'
        },
        {
            title: '导入',
            key: 'age',
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('a', {
                        on: {
                            click: () => {
                                this.previewImg(params);
                            }
                        }
                    }, [
                        h('img', { //显示已上传图片
                            attrs: { src: params.row.innerPrizeImg },
                            style: { maxWidth: '40px', maxHeight: '30px', verticalAlign: 'middle', marginRight: '10px' },
                        })
                    ]),
                    h('Upload', {
                        props: {
                            props: {
                                'show-upload-list': false,
                                showUploadList: false
                            },
                            type: 'select',
                            action: '//47.52.230.11:5033/api/custList/uploadFile', // localhost 阻止上传
                            headers: {
                                AuthToken: sessionStorage.getItem('token')
                            },
                            'before-upload': this.uploadBefore, //上传前调用函数
                            'on-success': this.uploadSuccess,
                            'on-error': this.uploadError,
                            data: {
                                userId: params.row.id
                            }
                        },
                        style: {
                            display: 'inline-block',
                            marginRight: '10px',
                            marginBottom: '-10px'
                        },
                    }, [
                        h('Button', {
                            props: {
                                // type: 'primary',
                                size: 'small',
                                icon: 'ios-cloud-upload-outline'
                            },
                            style: {
                                marginBottom: '8px'
                            },
                            on: {
                                click: () => {
                                    this.uploadFileChoose = params; // 赋值当前行参数，用于编写业务逻辑时使用
                                }
                            }
                        }, '上传'),
                    ]),
                ]);
            }
        },
        {
            title: '导出',
            key: 'name',
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('a', {
                        on: {
                            click: () => {

                            }
                        }
                    }, [
                        h('img', { //显示已上传图片
                            attrs: { src: params.row.innerPrizeImg },
                            style: { maxWidth: '40px', maxHeight: '30px', verticalAlign: 'middle', marginRight: '10px' },
                        })
                    ]),
                    h('div', {
                        style: {
                            display: 'inline-block',
                            marginRight: '10px'
                        },
                    }, [
                        h('Button', {
                            props: {
                                // type: 'primary',
                                size: 'small',
                                icon: 'ios-cloud-download-outline'
                            },
                            on: {
                                click: () => {
                                    this.download(params)
                                }
                            }
                        }, '导出'),
                    ]),
                ]);
            }
        },
        // {
        //     title: '其他',
        //     key: 'userId'
        // },
        {
            title: '操作',
            width: '110',
            key: 'age',
            render: (h, params) => {
                return h('div', [
                    h('Tooltip', {
                        props: {
                            placement: 'top',
                            transfer: true,
                            content: '修改用户'
                        }
                    }, [h('Icon', {
                        props: { type: 'md-create', size: 22 },
                        style: { marginRight: "14px", cursor: 'pointer' },
                        on: {
                            click: () => { this.addOredit(params.row) }
                        }
                    })]
                    ),
                    h('Tooltip', {
                        props: {
                            placement: 'top',
                            transfer: true,
                            content: '删除资料'
                        }
                    }, [h('Icon', {
                        props: { type: 'ios-trash', size: 22 },
                        style: { marginRight: "14px", cursor: 'pointer' },
                        on: {
                            click: () => { this.deleteFile(params.row.id) }
                        }
                    })]
                    )
                ])
                // return h('div',[
                // h('Icon', {
                //     props: {
                //       type: 'md-create',
                //       size: 22,
                //     },
                //     style: {
                //         marginRight: "14px",
                //         cursor: 'pointer'
                //     },
                //     on: {
                //         click: () => {
                //             this.addOredit(params.row)
                //         }
                //     }
                // }),
                //     h('Icon', {
                //         props: {
                //           type: 'ios-trash',
                //           size: 22
                //         },
                //         style: {
                //             marginRight: "14px",
                //             cursor: 'pointer'
                //         },
                //         on: {
                //             click: () => {
                //                 this.deleteFile(params.row.id)
                //             }
                //         }
                //     })
                // ])
            }
        }
    ]
}


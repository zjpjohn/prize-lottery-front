import LayoutContainer from "../components/LayoutContainer.vue";
import RouteContainer from "../components/RouteContainer.vue";
import AuthLoginView from "../views/AuthLoginView.vue";
import DashboardView from "../views/DashboardView.vue";

export default [
    {
        path: '/login',
        name: 'login',
        component: AuthLoginView
    },
    {
        path: '/',
        name: 'home',
        component: LayoutContainer,
        redirect: '/index',
        meta: {
            name: '首页',
            icon: 'icon icon-home',
            menu: true,
            page: true,
        },
        children: [
            {
                path: 'index',
                component: DashboardView
            }
        ]
    },
    {
        path: '/system',
        name: 'system',
        component: LayoutContainer,
        redirect: '/system/admin',
        meta: {
            name: '系统',
            remark: '系统管理',
            icon: 'icon icon-settings',
            menu: true
        },
        children: [
            {
                path: 'admin',
                component: RouteContainer,
                redirect: '/system/admin/list',
                meta: {
                    name: '系统账户',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/adm/AdminUserMgrView'),
                    },
                    {
                        path: 'create',
                        component: () => import('../views/adm/AdminCreateView'),
                        meta: {
                            name: '创建账户'
                        }
                    },
                    {
                        path: 'detail/:id',
                        component: () => import('../views/adm/AdminUserView'),
                        meta: {
                            name: '账户详情'
                        }
                    },
                ],
            },
            {
                path: 'mine/',
                component: () => import('../views/adm/AdminMineView.vue'),
                meta: {
                    name: '我的账户',
                    menu: true,
                },
            }
        ]
    },
    {
        path: '/ads',
        name: 'advertise',
        component: LayoutContainer,
        redirect: '/ads/index',
        meta: {
            name: '广告',
            remark: '广告中心',
            icon: 'icon icon-advertise',
            menu: process.env.ENV_ADS === 'yes',
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/ads/AdsDashboardView.vue'),
                meta: {
                    name: '广告动态',
                    menu: true,
                }
            },
            {
                path: 'mgr',
                component: RouteContainer,
                redirect: '/ads/mgr/acct',
                meta: {
                    name: '广告管理',
                    menu: true,
                },
                children: [
                    {
                        path: 'acct',
                        component: () => import('../views/ads/AdAcctManagerView.vue'),
                    },
                    {
                        path: ':acctId',
                        redirect: '/ads/mgr/:acctId/app',
                        component: RouteContainer,
                        meta: {
                            name: '广告应用',
                        },
                        children: [
                            {
                                path: 'app',
                                component: () => import('../views/ads/AdsManagerView'),
                            },
                            {
                                path: ':appId/unit',
                                component: () => import('../views/ads/AdsAppDetailView'),
                                meta: {
                                    name: '媒体详情'
                                },
                            },
                        ],
                    },
                ],
            },
            {
                path: 'adset',
                component: RouteContainer,
                redirect: '/ads/adset/index',
                meta: {
                    name: '聚合平台',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/adset/AdsetDashboardView.vue'),
                    },
                    {
                        path: 'media',
                        redirect: '/ads/adset/media/index',
                        component: RouteContainer,
                        meta: {
                            name: '媒体管理',
                        },
                        children: [
                            {
                                path: 'index',
                                component: () => import('../views/adset/AdMediaManagerView.vue'),
                            },
                            {
                                path: 'detail/:mediaId',
                                component: () => import('../views/adset/AdMediaDetailView.vue'),
                                meta: {
                                    name: '媒体详情',
                                },
                            },
                        ]
                    },
                ],
            },
        ]
    },
    {
        path: '/app',
        name: 'app',
        component: LayoutContainer,
        redirect: '/app/',
        meta: {
            name: '应用',
            icon: 'icon icon-app-mgr',
            menu: true,
            page: true
        },
        children: [
            {
                path: '/',
                redirect: '/app/list',
                component: RouteContainer,
                meta: {
                    name: '应用管理',
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/app/AppListView'),
                    },
                    {
                        path: 'add',
                        component: () => import('../views/app/AppAddView'),
                        meta: {
                            name: '创建应用'
                        }
                    },
                    {
                        path: 'detail/:appId',
                        component: () => import('../views/app/AppDetailView'),
                        meta: {
                            name: '应用详情'
                        }
                    },
                    {
                        path: ':appNo/version',
                        redirect: '/app/:appNo/version/list',
                        component: RouteContainer,
                        meta: {
                            name: '应用版本',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/app/version/VersionListView'),
                            },
                            {
                                path: 'add',
                                component: () => import('../views/app/version/VersionAddView'),
                                meta: {
                                    name: '创建版本'
                                }
                            },
                            {
                                path: 'edit/:versionId',
                                component: () => import('../views/app/version/VersionEditView'),
                                meta: {
                                    name: '应用详情'
                                }
                            },
                        ]
                    },
                    {
                        path: ':appNo/resource',
                        redirect: '/app/:appNo/resource/list',
                        component: RouteContainer,
                        meta: {
                            name: '应用资源',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/app/resource/ResourceListView'),
                            },
                            {
                                path: 'add',
                                component: () => import('../views/app/resource/ResourceAddView'),
                                meta: {
                                    name: '创建资源'
                                }
                            },
                            {
                                path: 'edit/:resourceId',
                                component: () => import('../views/app/resource/ResourceEditView'),
                                meta: {
                                    name: '编辑资源'
                                }
                            }
                        ]
                    },
                    {
                        path: ':appNo/assist',
                        redirect: '/app/:appNo/assist/list',
                        component: RouteContainer,
                        meta: {
                            name: '应用助手',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/app/assistant/AssistantListView'),
                            },
                            {
                                path: 'add',
                                component: () => import('../views/app/assistant/AssistantAddView'),
                                meta: {
                                    name: '创建助手'
                                }
                            },
                            {
                                path: 'detail/:id',
                                component: () => import('../views/app/assistant/AssistantDetailView.vue'),
                                meta: {
                                    name: '助手详情'
                                }
                            },
                        ]
                    },
                    {
                        path: ':appNo/comment',
                        redirect: '/app/:appNo/comment/list',
                        component: RouteContainer,
                        meta: {
                            name: '应用评论',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/app/comment/CommentListView.vue'),
                            },
                            {
                                path: 'add',
                                component: () => import('../views/app/comment/CommentCreateView.vue'),
                                meta: {
                                    name: '创建评论'
                                }
                            },
                            {
                                path: 'detail/:id',
                                component: () => import('../views/app/comment/CommentDetailView.vue'),
                                meta: {
                                    name: '评论详情'
                                }
                            },
                        ],
                    },
                    {
                        path: ':appNo/verify',
                        redirect: '/app/:appNo/verify/',
                        component: RouteContainer,
                        meta: {
                            name: '授权管理',
                        },
                        children: [
                            {
                                path: '/',
                                component: () => import('../views/app/verify/VerifyManagerView'),
                            },
                            {
                                path: 'create',
                                component: () => import('../views/app/verify/VerifyCreateView'),
                                meta: {
                                    name: '创建授权配置',
                                },
                            },
                        ],
                    },
                    {
                        path: ':appNo/feed',
                        component: RouteContainer,
                        redirect: '/app/:appNo/feed/list',
                        meta: {
                            name: '应用反馈',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/feedback/FeedbackListView'),
                            },
                            {
                                path: 'type',
                                component: () => import('../views/feedback/FeedbackTypeView.vue'),
                                meta: {
                                    name: '反馈类型'
                                }
                            },
                            {
                                path: 'handle/:id',
                                component: () => import('../views/feedback/FeedbackHandleView'),
                                meta: {
                                    name: '反馈处理',
                                }
                            }
                        ],
                    },
                    {
                        path: ':appNo/contact',
                        component: RouteContainer,
                        redirect: '/app/:appNo/contact/list',
                        meta: {
                            name: '联系人',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/app/contact/ContactListView.vue'),
                            },
                        ],
                    },
                ],
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        component: LayoutContainer,
        redirect: '/user/index',
        meta: {
            name: '用户',
            remark: '用户中心',
            icon: 'icon icon-users',
            menu: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/user/UserDashboardView.vue'),
                meta: {
                    name: '用户动态',
                    menu: true,
                },
            },
            {
                path: '/',
                redirect: '/user/mgr',
                component: RouteContainer,
                meta: {
                    name: '用户管理',
                    menu: true,
                },
                children: [
                    {
                        path: 'mgr',
                        component: () => import('../views/user/UserManagerView.vue'),
                    },
                    {
                        path: 'active',
                        component: () => import('../views/user/ActiveUserView.vue'),
                        meta: {
                            name: '活跃用户',
                        }
                    },
                    {
                        path: 'detail/:id',
                        component: () => import('../views/user/UserDetailView'),
                        meta: {
                            name: '用户详情'
                        }
                    }
                ],
            },
        ]
    },
    {
        path: '/member',
        name: 'member',
        component: LayoutContainer,
        redirect: '/member/index',
        meta: {
            name: '会员',
            remark: '会员管理',
            icon: 'icon icon-huiyuan',
            menu: true
        },
        children: [
            {
                path: 'pack',
                component: RouteContainer,
                redirect: '/member/pack/index',
                meta: {
                    name: '会员中心',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/member/MemberDashboardView.vue'),
                    },
                    {
                        path: 'create',
                        component: () => import('../views/member/MemberPackCreateView.vue'),
                        meta: {
                            name: '创建套餐',
                        },
                    },
                    {
                        path: 'detail/:packNo',
                        component: () => import('../views/member/MemberPackDetailView.vue'),
                        meta: {
                            name: '套餐详情',
                        },
                    },
                    {
                        path: 'privilege',
                        component: () => import('../views/member/PackPrivilegeListView.vue'),
                        meta: {
                            name: '套餐特权',
                        },
                    },
                ],
            },
            {
                path: 'user',
                component: RouteContainer,
                redirect: '/member/user/list',
                meta: {
                    name: '会员管理',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/member/UserMemberMgrView.vue'),
                    },
                    {
                        path: 'open',
                        component: () => import('../views/member/MemberOpenFilterView.vue'),
                        meta: {
                            name: '开通会员',
                        },
                    },
                    {
                        path: 'detail/:userId',
                        component: () => import('../views/member/UserMemberDetailView.vue'),
                        meta: {
                            name: '会员详情',
                        },
                    },
                ],
            }
        ],
    },
    {
        path: '/agent',
        name: 'agent',
        component: LayoutContainer,
        redirect: '/agent/user',
        meta: {
            name: '流量',
            remark: '流量主管理',
            icon: 'icon icon-agent',
            menu: true
        },
        children: [
            {
                path: 'user',
                component: RouteContainer,
                redirect: '/agent/user/list',
                meta: {
                    name: '流量推广',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/agent/user/AgentUserListView'),
                    },
                    {
                        path: 'detail/:userId',
                        component: () => import('../views/agent/user/AgentUserDetailView'),
                        meta: {
                            name: '流量主详情'
                        },
                    },
                    {
                        path: 'apply',
                        component: () => import('../views/agent/apply/AgentApplyListView'),
                        meta: {
                            name: '审核管理',
                        },
                    },
                ]
            },
            {
                path: 'rule',
                component: RouteContainer,
                redirect: '/agent/rule/list',
                meta: {
                    name: '推广规则',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/agent/rule/AgentRuleListView'),
                    },
                ],
            },
            {
                path: 'put',
                component: RouteContainer,
                redirect: '/agent/put/channel',
                meta: {
                    name: '渠道投放',
                    menu: true,
                },
                children: [
                    {
                        path: 'channel',
                        component: () => import('../views/put/PutChannelListView.vue'),
                        meta: {
                            name: '渠道管理'
                        },
                    },
                    {
                        path: ':channel/:appNo/record',
                        component: () => import('../views/put/PutRecordManagerView.vue'),
                        meta: {
                            name: '投放管理'
                        }
                    }
                ],
            },
        ],
    },
    {
        path: '/pay',
        name: 'pay',
        component: LayoutContainer,
        redirect: '/pay/order/dashboard',
        meta: {
            name: '订单',
            remark: '订单支付',
            icon: 'icon icon-order',
            menu: process.env.ENV_PAY === 'yes',
        },
        children: [
            {
                path: 'order',
                component: RouteContainer,
                redirect: '/pay/order/dashboard',
                meta: {
                    name: '订单中心',
                    menu: true,
                },
                children: [
                    {
                        path: 'dashboard',
                        component: () => import('../views/pay/order/OrderDashboardView'),
                    },
                    {
                        path: 'manager',
                        redirect: '/pay/order/manager/list',
                        component: RouteContainer,
                        meta: {
                            name: '订单管理',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/pay/order/PayOrderListView'),
                            },
                            {
                                path: 'detail/:orderNo',
                                component: () => import('../views/pay/order/PayOrderDetailView'),
                                meta: {
                                    name: '订单详情',
                                }
                            },
                            {
                                path: 'settle',
                                component: () => import('../views/pay/order/PayOrderSettleView'),
                                meta: {
                                    name: '对账管理',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                path: 'withdraw',
                component: RouteContainer,
                redirect: '/pay/withdraw/list',
                meta: {
                    name: '提现管理',
                    menu: process.env.ENV_PAY === 'yes',
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/pay/transfer/PayWithdrawList'),
                    },
                    {
                        path: 'detail/:id',
                        component: () => import('../views/pay/transfer/PayWithdrawDetail'),
                        meta: {
                            name: '提现详情',
                        },
                    },
                    {
                        path: 'rule/list',
                        component: () => import('../views/pay/transfer/rule/WithdrawRuleList.vue'),
                        meta: {
                            name: '提现规则',
                        },
                    },
                    {
                        path: 'audit/rule',
                        component: () => import('../views/pay/transfer/audit/AuditWithdrawRule.vue'),
                        meta: {
                            name: '审核规则',
                        },
                    },
                    {
                        path: 'level',
                        redirect: '/pay/withdraw/level/list',
                        component: RouteContainer,
                        meta: {
                            name: '提现等级',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/pay/transfer/level/WithdrawLevelList.vue'),
                            },
                            {
                                path: 'add',
                                component: () => import('../views/pay/transfer/level/WithdrawLevelCreate.vue'),
                                meta: {
                                    name: '新增等级',
                                },
                            },
                            {
                                path: 'detail/:id',
                                component: () => import('../views/pay/transfer/level/WithdrawLevelDetail.vue'),
                                meta: {
                                    name: '等级详情',
                                },
                            },
                        ]
                    },
                ],
            },
            {
                path: 'channel',
                component: RouteContainer,
                redirect: '/pay/channel/list',
                meta: {
                    name: '支付渠道',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/pay/channel/PayChannelList'),
                    },
                    {
                        path: 'detail/:id',
                        component: () => import('../views/pay/channel/PayChannelDetail'),
                        meta: {
                            name: '渠道详情',
                        },
                    },
                    {
                        path: 'create',
                        component: () => import('../views/pay/channel/PayChannelCreate'),
                        meta: {
                            name: '创建渠道',
                        },
                    }
                ],
            },
            {
                path: 'voucher',
                component: RouteContainer,
                redirect: '/pay/voucher/list',
                meta: {
                    name: '优惠卡券',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/voucher/VoucherListView'),
                    },
                    {
                        path: 'create',
                        component: () => import('../views/voucher/VoucherCreateView'),
                        meta: {
                            name: '创建代金券',
                        }
                    },
                    {
                        path: 'detail/:seqNo',
                        component: () => import('../views/voucher/VoucherDetailView'),
                        meta: {
                            name: '代金券详情',
                        },
                    },
                    {
                        path: 'log/:seqNo',
                        component: () => import('../views/voucher/VoucherLogListView'),
                        meta: {
                            name: '领券详情'
                        },
                    },
                ]
            },
            {
                path: 'activity',
                component: RouteContainer,
                redirect: '/pay/activity/list',
                meta: {
                    name: '抽奖活动',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/activity/ActivityListView.vue'),
                    },
                    {
                        path: 'create',
                        component: () => import('../views/activity/ActivityCreateView.vue'),
                        meta: {
                            name: '创建活动',
                        }
                    },
                    {
                        path: 'detail/:id',
                        component: () => import('../views/activity/ActivityDetailView.vue'),
                        meta: {
                            name: '活动详情',
                        }
                    },
                    {
                        path: 'draw/:activityId',
                        component: () => import('../views/activity/ActivityDrawView.vue'),
                        meta: {
                            name: '抽奖记录',
                        }
                    },
                ],
            },
        ],
    },
    {
        path: '/push',
        name: 'push',
        component: LayoutContainer,
        redirect: '/push/message',
        meta: {
            name: '消息',
            remark: '消息中心',
            icon: 'icon icon-push',
            menu: true,
        },
        children: [
            {
                path: 'message',
                redirect: '/push/message/channel',
                component: RouteContainer,
                meta: {
                    name: '站内信息',
                    menu: true,
                },
                children: [
                    {
                        path: 'channel',
                        component: () => import('../views/message/ChannelManagerView'),
                        meta: {
                            name: '消息渠道',
                        },
                    },
                    {
                        path: 'channel/create',
                        component: () => import('../views/message/ChannelCreateView'),
                        meta: {
                            name: '创建渠道',
                        },
                    },
                    {
                        path: 'channel/detail/:channel',
                        component: () => import('../views/message/ChannelDetailView'),
                        meta: {
                            name: '渠道详情',
                        },
                    },
                    {
                        path: 'announce',
                        component: () => import('../views/message/AnnounceListView'),
                        meta: {
                            name: '公告管理',
                        },
                    },
                    {
                        path: 'remind',
                        component: () => import('../views/message/RemindListView'),
                        meta: {
                            name: '提醒管理',
                        },
                    },
                ],
            },
            {
                path: '/',
                redirect: '/push/app',
                component: RouteContainer,
                meta: {
                    name: '推送管理',
                    menu: true,
                },
                children: [
                    {
                        path: 'app',
                        component: () => import('../views/push/PushManagerView.vue'),
                    },
                    {
                        path: 'device/:appKey',
                        component: () => import('../views/push/PushDeviceListView.vue'),
                        meta: {
                            name: '设备集合',
                        },
                    },
                    {
                        path: 'tag-group/:appKey',
                        redirect: 'push/tag-group/:appKey/tag-group/list',
                        component: RouteContainer,
                        meta: {
                            name: '标签管理',
                        },
                        children: [
                            {
                                path: 'list',
                                component: () => import('../views/push/TagGroupListView'),
                            },
                            {
                                path: 'notify/:groupId',
                                redirect: '/push/tag-group/:appKey/notify/:groupId/list',
                                component: RouteContainer,
                                meta: {
                                    name: '通知管理'
                                },
                                children: [
                                    {
                                        path: 'list',
                                        component: () => import('../views/push/notify/PushNotifyListView'),
                                    },
                                    {
                                        path: 'create',
                                        component: () => import('../views/push/notify/NotifyInfoCreateView'),
                                        meta: {
                                            name: '创建通知',
                                        },
                                    },
                                    {
                                        path: 'detail/:id',
                                        component: () => import('../views/push/notify/NotifyInfoDetailView'),
                                        meta: {
                                            name: '通知详情',
                                        },
                                    },
                                    {
                                        path: 'tasks/:id',
                                        component: () => import('../views/push/notify/PushTaskListView'),
                                        meta: {
                                            name: '通知任务',
                                        },
                                    },
                                ],
                            },
                        ]
                    },

                ],
            },

        ],
    },
    {
        path: '/info',
        name: 'news',
        component: LayoutContainer,
        redirect: '/info/news/',
        meta: {
            name: '彩讯',
            remark: '彩讯中心',
            icon: 'icon icon-news',
            menu: true,
        },
        children: [
            {
                path: 'news',
                component: RouteContainer,
                redirect: '/info/news/list',
                meta: {
                    name: '彩票资讯',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/news/LottoNewsListView'),
                    },
                    {
                        path: 'detail/:seq',
                        component: () => import('../views/news/LottoNewsDetailView'),
                        meta: {
                            name: '资讯详情'
                        }
                    }
                ]
            },
            {
                path: 'skill',
                name: 'skill',
                component: RouteContainer,
                redirect: '/info/skill/list',
                meta: {
                    name: '选彩技巧',
                    menu: true,
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/skill/LottoSkillListView'),
                    },
                    {
                        path: 'detail/:seq',
                        component: () => import('../views/skill/LottoSkillDetailView'),
                        meta: {
                            name: '技巧详情'
                        }
                    }
                ],
            },
        ],
    },
    {
        path: '/master',
        name: 'master',
        component: LayoutContainer,
        redirect: '/master/',
        meta: {
            name: '专家',
            remark: '专家管理',
            icon: 'icon icon-expert',
            menu: true,
            page: true
        },
        children: [
            {
                path: '/',
                component: RouteContainer,
                redirect: '/master/list',
                meta: {
                    name: '预测专家',
                    menu: true
                },
                children: [
                    {
                        path: 'list',
                        component: () => import('../views/lotto/master/LottoMasterListView'),
                    },
                    {
                        path: 'detail/:masterId',
                        component: () => import('../views/lotto/master/LottoMasterView'),
                        meta: {
                            name: '专家详情'
                        }
                    },
                    {
                        path: 'glad',
                        component: () => import('../views/lotto/master/MasterGladListView'),
                        meta: {
                            name: '中奖喜讯',
                        }
                    },
                    {
                        path: 'feeds',
                        component: () => import('../views/lotto/master/MasterFeedsListView'),
                        meta: {
                            name: '预测信息流'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/fsd',
        name: 'fc3d',
        component: LayoutContainer,
        redirect: '/fsd/index',
        meta: {
            name: '福彩三',
            remark: '福彩3D管理',
            icon: 'icon icon-fc3d',
            menu: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/lotto/lottery/LotteryDataView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'fc3d'});
                    next();
                },
                meta: {
                    name: '开奖信息',
                    menu: true,
                }
            },
            {
                path: 'data',
                component: RouteContainer,
                redirect: '/fsd/data/index',
                meta: {
                    name: '预测管理',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/fc3d/Fc3dDataView.vue'),
                    },
                    {
                        path: 'dan/filter',
                        component: () => import('../views/lotto/fc3d/Fc3dDanFilterView.vue'),
                        meta: {
                            name: '胆码过滤',
                        }
                    },
                    {
                        path: 'item',
                        component: RouteContainer,
                        redirect: '/fsd/data/item/index',
                        meta: {
                            name: '分类预测',
                        },
                        children: [
                            {
                                path: 'index',
                                component: () => import('../views/lotto/fc3d/Fc3dItemDataView.vue'),
                            },
                            {
                                path: 'table',
                                component: () => import('../views/lotto/fc3d/pivot/Fc3dItemTableView.vue'),
                                meta: {
                                    name: '优选表'
                                },
                            },
                            {
                                path: 'whole',
                                component: () => import('../views/lotto/fc3d/Fc3dWholeBestView.vue'),
                                meta: {
                                    name: '优选专家'
                                },
                            },
                        ]
                    },
                    {
                        path: 'pivot',
                        component: RouteContainer,
                        redirect: '/fsd/data/pivot/index',
                        meta: {
                            name: '今日要点',
                        },
                        children: [
                            {
                                path: 'index',
                                component: () => import('../views/lotto/fc3d/pivot/Fc3dPivotListView.vue'),
                            },
                            {
                                path: 'detail/:id/:period',
                                component: () => import('../views/lotto/fc3d/pivot/Fc3dPivotDetailView.vue'),
                                meta: {
                                    name: '要点详情',
                                },
                            },
                            {
                                path: 'filter',
                                component: () => import('../views/lotto/fc3d/pivot/Fc3dBestDataView.vue'),
                                meta: {
                                    name: '要点计算',
                                }
                            },

                        ],
                    },
                ],
            },
            {
                path: 'census',
                component: () => import('../views/lotto/fc3d/LayoutCensusContainer.vue'),
                redirect: '/fsd/census/all',
                meta: {
                    name: '统计分析',
                    menu: true,
                },
                children: [
                    {
                        path: 'all',
                        component: () => import('../views/lotto/fc3d/census/Fc3dCensusAllView')
                    },
                    {
                        path: 'item',
                        component: () => import('../views/lotto/fc3d/census/Fc3dCensusItemView.vue')
                    },
                    {
                        path: 'vip',
                        component: () => import('../views/lotto/fc3d/census/Fc3dCensusVipView')
                    },
                    {
                        path: 'hot',
                        component: () => import('../views/lotto/fc3d/census/Fc3dCensusHotView')
                    },
                    {
                        path: 'high',
                        component: () => import('../views/lotto/fc3d/census/Fc3dCensusHighView')
                    },
                    {
                        path: 'indices',
                        component: () => import('../views/lotto/fc3d/census/Fc3dLottoIndexView.vue')
                    },
                    {
                        path: 'num3/index',
                        component: () => import('../views/lotto/lottery/LotteryNum3IndexView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                ],
            },
            {
                path: 'calc',
                component: () => import('../views/lotto/fc3d/LayoutCalcContainer.vue'),
                redirect: '/fsd/calc/recommend',
                meta: {
                    name: '计算分析',
                    menu: true,
                },
                children: [
                    {
                        path: 'recommend',
                        component: () => import('../views/lotto/fc3d/calc/Fc3dCalcRecommendView')
                    },
                    {
                        path: 'danKill',
                        component: () => import('../views/lotto/fc3d/calc/Fc3dCalcDanKillView')
                    },
                    {
                        path: 'com',
                        component: () => import('../views/lotto/fc3d/calc/Fc3dCom7FilterView.vue')
                    },
                    {
                        path: 'aug',
                        component: () => import('../views/lotto/fc3d/calc/Fc3dCalcAugView')
                    },
                    {
                        path: 'rev',
                        component: () => import('../views/lotto/fc3d/calc/Fc3dCalcRevView')
                    },
                    {
                        path: 'd3',
                        component: () => import('../views/lotto/fc3d/calc/Fc3dDan3FilterView.vue')
                    },
                    {
                        path: 'dan3',
                        component: () => import('../views/lotto/fc3d/calc/Fc3dComFilterView.vue')
                    },
                    {
                        path: 'wens',
                        component: () => import('../views/lotto/lottery/LotteryFilterView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                    {
                        path: 'lotto/filter',
                        component: () => import('../views/lotto/lottery/LotteryNum3FilterView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    }
                ]
            },
            {
                path: 'master',
                component: () => import('../views/lotto/fc3d/Fc3dMasterView.vue'),
                meta: {
                    name: '专家管理',
                    menu: true,
                }
            },
            {
                path: 'fast',
                component: () => import('../views/lotto/lottery/LottoFastTableView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'fc3d'});
                    next();
                },
                meta: {
                    name: '快速查表',
                    menu: true,
                }
            },
            {
                path: 'warn',
                redirect: '/fsd/warn/index',
                component: RouteContainer,
                meta: {
                    name: '预警推荐',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/warn/Num3WarnListView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                    {
                        path: 'filter',
                        component: () => import('../views/lotto/warn/Num3WarnFilterView.vue'),
                        meta: {
                            name: '过滤计算'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                    {
                        path: 'detail/:period/:id',
                        component: () => import('../views/lotto/warn/Num3WarnDetailView.vue'),
                        meta: {
                            name: '预警详情'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                ],
            },
            {
                path: 'layer',
                redirect: '/fsd/layer/index',
                component: RouteContainer,
                meta: {
                    name: '分层预警',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/layer/Num3LayerListView.vue'),
                        meta: {
                            name: '预警列表'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                    {
                        path: 'filter',
                        component: () => import('../views/lotto/layer/Num3LayerFilterView.vue'),
                        meta: {
                            name: '过滤计算'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                    {
                        path: 'detail/:period/:id',
                        component: () => import('../views/lotto/layer/Num3LayerDetailView.vue'),
                        meta: {
                            name: '预警详情'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                ],
            },
            {
                path: 'around',
                redirect: '/fsd/around/index',
                component: RouteContainer,
                meta: {
                    name: '绕胆工具',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/around/AroundListView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                    {
                        path: 'add',
                        component: () => import('../views/lotto/around/AroundCreateView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                        meta: {
                            name: '新增绕胆',
                        }
                    },
                ]
            },
            {
                path: 'honey',
                redirect: '/fsd/honey/index',
                component: RouteContainer,
                meta: {
                    name: '配胆工具',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/honey/HoneyListView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                    },
                    {
                        path: 'add',
                        component: () => import('../views/lotto/honey/HoneyCreateView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'fc3d'});
                            next();
                        },
                        meta: {
                            name: '新增配胆',
                        }
                    },
                ]
            },
        ]
    },
    {
        path: '/pls',
        name: 'pls',
        component: LayoutContainer,
        redirect: '/pls/index',
        meta: {
            name: '排列三',
            remark: '排列三管理',
            icon: 'icon icon-pailie3',
            menu: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/lotto/lottery/LotteryDataView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'pl3'});
                    next();
                },
                meta: {
                    name: '开奖信息',
                    menu: true,
                }
            },
            {
                path: 'data',
                component: RouteContainer,
                redirect: '/pls/data/index',
                meta: {
                    name: '预测管理',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/pl3/Pl3DataView.vue'),
                    },
                    {
                        path: 'dan/filter',
                        component: () => import('../views/lotto/pl3/Pl3DanFilterView.vue'),
                        meta: {
                            name: '胆码过滤',
                        }
                    },
                    {
                        path: 'item',
                        component: RouteContainer,
                        redirect: '/pls/data/item/index',
                        meta: {
                            name: '分类预测',
                        },
                        children: [
                            {
                                path: 'index',
                                component: () => import('../views/lotto/pl3/Pl3ItemDataView.vue'),
                            },
                            {
                                path: 'table',
                                component: () => import('../views/lotto/pl3/pivot/Pl3ItemTableView.vue'),
                                meta: {
                                    name: '优选表'
                                },
                            },
                            {
                                path: 'whole',
                                component: () => import('../views/lotto/pl3/Pl3WholeBestView.vue'),
                                meta: {
                                    name: '优选专家'
                                },
                            },
                        ],
                    },
                    {
                        path: 'pivot',
                        component: RouteContainer,
                        redirect: '/pls/data/pivot/index',
                        meta: {
                            name: '今日要点'
                        },
                        children: [
                            {
                                path: 'index',
                                component: () => import('../views/lotto/pl3/pivot/Pl3PivotListView.vue'),
                            },
                            {
                                path: "detail/:id/:period",
                                component: () => import('../views/lotto/pl3/pivot/Pl3PivotDetailView.vue'),
                                meta: {
                                    name: '要点详情',
                                },
                            },
                            {
                                path: 'filter',
                                component: () => import('../views/lotto/pl3/pivot/Pl3BestDataView.vue'),
                                meta: {
                                    name: '要点计算',
                                }
                            },
                        ],
                    },
                ],
            },
            {
                path: 'census',
                component: () => import('../views/lotto/pl3/LayoutCensusContainer.vue'),
                redirect: '/pls/census/all',
                meta: {
                    name: '统计分析',
                    menu: true,
                },
                children: [
                    {
                        path: 'all',
                        component: () => import('../views/lotto/pl3/census/Pl3CensusAllView')
                    },
                    {
                        path: 'item',
                        component: () => import('../views/lotto/pl3/census/Pl3CensusItemView.vue')
                    },
                    {
                        path: 'vip',
                        component: () => import('../views/lotto/pl3/census/Pl3CensusVipView')
                    },
                    {
                        path: 'hot',
                        component: () => import('../views/lotto/pl3/census/Pl3CensusHotView')
                    },
                    {
                        path: 'high',
                        component: () => import('../views/lotto/pl3/census/Pl3CensusHighView')
                    },
                    {
                        path: 'indices',
                        component: () => import('../views/lotto/pl3/census/Pl3LottoIndexView.vue')
                    },
                    {
                        path: 'num3/index',
                        component: () => import('../views/lotto/lottery/LotteryNum3IndexView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                ],
            },
            {
                path: 'calc',
                component: () => import('../views/lotto/pl3/LayoutCalcContainer.vue'),
                redirect: '/pls/calc/recommend',
                meta: {
                    name: '计算分析',
                    menu: true,
                },
                children: [
                    {
                        path: 'recommend',
                        component: () => import('../views/lotto/pl3/calc/Pl3CalcRecommendView')
                    },
                    {
                        path: 'danKill',
                        component: () => import('../views/lotto/pl3/calc/Pl3CalcDanKillView')
                    },
                    {
                        path: 'aug',
                        component: () => import('../views/lotto/pl3/calc/Pl3CalcAugView')
                    },
                    {
                        path: 'com',
                        component: () => import('../views/lotto/pl3/calc/Pl3Com7FilterView.vue')
                    },
                    {
                        path: 'rev',
                        component: () => import('../views/lotto/pl3/calc/Pl3CalcComView')
                    },
                    {
                        path: 'd3',
                        component: () => import('../views/lotto/pl3/calc/Pl3Dan3FilterView.vue')
                    },
                    {
                        path: 'dan3',
                        component: () => import('../views/lotto/pl3/calc/Pl3ComFilterView.vue')
                    },
                    {
                        path: 'wens',
                        component: () => import('../views/lotto/lottery/LotteryFilterView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                    {
                        path: 'lotto/filter',
                        component: () => import('../views/lotto/lottery/LotteryNum3FilterView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    }
                ]
            },
            {
                path: 'master',
                component: () => import('../views/lotto/pl3/Pl3MasterView.vue'),
                meta: {
                    name: '专家管理',
                    menu: true,
                }
            },
            {
                path: 'fast',
                component: () => import('../views/lotto/lottery/LottoFastTableView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'pl3'});
                    next();
                },
                meta: {
                    name: '快速查表',
                    menu: true,
                }
            },
            {
                path: 'warn',
                redirect: '/pls/warn/index',
                component: RouteContainer,
                meta: {
                    name: '预警推荐',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/warn/Num3WarnListView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                    {
                        path: 'filter',
                        component: () => import('../views/lotto/warn/Num3WarnFilterView.vue'),
                        meta: {
                            name: '过滤计算'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                    {
                        path: 'detail/:period/:id',
                        component: () => import('../views/lotto/warn/Num3WarnDetailView.vue'),
                        meta: {
                            name: '预警详情'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                ],
            },
            {
                path: 'layer',
                redirect: '/pls/layer/index',
                component: RouteContainer,
                meta: {
                    name: '分层预警',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/layer/Num3LayerListView.vue'),
                        meta: {
                            name: '预警列表'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                    {
                        path: 'filter',
                        component: () => import('../views/lotto/layer/Num3LayerFilterView.vue'),
                        meta: {
                            name: '过滤计算'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                    {
                        path: 'detail/:period/:id',
                        component: () => import('../views/lotto/layer/Num3LayerDetailView.vue'),
                        meta: {
                            name: '预警详情'
                        },
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                ],
            },
            {
                path: 'around',
                redirect: '/pls/around/index',
                component: RouteContainer,
                meta: {
                    name: '绕胆工具',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/around/AroundListView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                    {
                        path: 'add',
                        component: () => import('../views/lotto/around/AroundCreateView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                        meta: {
                            name: '新增绕胆',
                        }
                    },
                ]
            },
            {
                path: 'honey',
                redirect: '/pls/honey/index',
                component: RouteContainer,
                meta: {
                    name: '配胆工具',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/honey/HoneyListView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                    },
                    {
                        path: 'add',
                        component: () => import('../views/lotto/honey/HoneyCreateView.vue'),
                        beforeEnter: (to, from, next) => {
                            Object.assign(to.query, {type: 'pl3'});
                            next();
                        },
                        meta: {
                            name: '新增配胆',
                        }
                    },
                ]
            },
        ]
    },
    {
        path: '/pl5',
        name: 'pl5',
        component: LayoutContainer,
        redirect: '/pl5/index',
        meta: {
            name: '排列五',
            icon: 'icon icon-pl5',
            menu: true,
            page: true,
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/lotto/lottery/LotteryDataView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'pl5'});
                    next();
                }
            }
        ],
    },
    {
        path: '/ssq',
        name: 'ssq',
        component: LayoutContainer,
        redirect: '/ssq/index',
        meta: {
            name: '双色球',
            remark: '双色球管理',
            icon: 'icon icon-shuangseqiu',
            menu: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/lotto/lottery/LotteryDataView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'ssq'});
                    next();
                },
                meta: {
                    name: '开奖信息',
                    menu: true,
                }
            },
            {
                path: 'data',
                component: () => import('../views/lotto/ssq/SsqDataView.vue'),
                meta: {
                    name: '预测管理',
                    menu: true,
                }
            },
            {
                path: 'census',
                component: () => import('../views/lotto/ssq/LayoutCensusContainer.vue'),
                redirect: '/ssq/census/all',
                meta: {
                    name: '统计分析',
                    menu: true,
                },
                children: [
                    {
                        path: 'all',
                        component: () => import('../views/lotto/ssq/census/SsqCensusAllView')
                    },
                    {
                        path: 'item',
                        component: () => import('../views/lotto/ssq/census/SsqCensusItemView.vue')
                    },
                    {
                        path: 'vip',
                        component: () => import('../views/lotto/ssq/census/SsqCensusVipView')
                    },
                    {
                        path: 'hot',
                        component: () => import('../views/lotto/ssq/census/SsqCensusHotView')
                    },
                    {
                        path: 'high',
                        component: () => import('../views/lotto/ssq/census/SsqCensusHighView')
                    },
                ]
            },
            {
                path: 'master',
                component: () => import('../views/lotto/ssq/SsqMasterView.vue'),
                meta: {
                    name: '专家管理',
                    menu: true,
                }
            },
        ]
    },
    {
        path: '/dlt',
        name: 'dlt',
        component: LayoutContainer,
        redirect: '/dlt/index',
        meta: {
            name: '大乐透',
            remark: '大乐透管理',
            icon: 'icon icon-daletou',
            menu: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/lotto/lottery/LotteryDataView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'dlt'});
                    next();
                },
                meta: {
                    name: '开奖信息',
                    menu: true,
                }
            },
            {
                path: 'data',
                component: () => import('../views/lotto/dlt/DltDataView.vue'),
                meta: {
                    name: '预测数据',
                    menu: true,
                }
            },
            {
                path: 'census',
                component: () => import('../views/lotto/dlt/LayoutCensusContainer.vue'),
                redirect: '/dlt/census/all',
                meta: {
                    name: '统计分析',
                    menu: true,
                },
                children: [
                    {
                        path: 'all',
                        component: () => import('../views/lotto/dlt/census/DltCensusAllView')
                    },
                    {
                        path: 'item',
                        component: () => import('../views/lotto/dlt/census/DltCensusItemView.vue')
                    },
                    {
                        path: 'vip',
                        component: () => import('../views/lotto/dlt/census/DltCensusVipView')
                    },
                    {
                        path: 'hot',
                        component: () => import('../views/lotto/dlt/census/DltCensusHotView')
                    },
                    {
                        path: 'high',
                        component: () => import('../views/lotto/dlt/census/DltCensusHighView')
                    },
                ]
            },
            {
                path: 'master',
                component: () => import('../views/lotto/dlt/DltMasterView.vue'),
                meta: {
                    name: '专家管理',
                    menu: true,
                }
            }
        ]
    },
    {
        path: '/qlc',
        name: 'qlc',
        component: LayoutContainer,
        redirect: '/qlc/index',
        meta: {
            name: '七乐彩',
            remark: '七乐彩管理',
            icon: 'icon icon-qilecai',
            menu: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/lotto/lottery/LotteryDataView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'qlc'});
                    next();
                },
                meta: {
                    name: '开奖信息',
                    menu: true,
                }
            },

            {
                path: 'data',
                component: RouteContainer,
                redirect: '/qlc/data/index',
                meta: {
                    name: '预测管理',
                    menu: true,
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('../views/lotto/qlc/QlcDataView.vue'),
                        meta: {
                            name: '首页',
                        }
                    },
                    {
                        path: 'whole',
                        component: () => import('../views/lotto/qlc/QlcWholeBestView.vue'),
                        meta: {
                            name: '优选专家'
                        },
                    },
                ]
            },
            {
                path: 'census',
                component: () => import('../views/lotto/qlc/LayoutCensusContainer.vue'),
                redirect: '/qlc/census/all',
                meta: {
                    name: '统计分析',
                    menu: true,
                },
                children: [
                    {
                        path: 'all',
                        component: () => import('../views/lotto/qlc/census/QlcCensusAllView')
                    },
                    {
                        path: 'item',
                        component: () => import('../views/lotto/qlc/census/QlcCensusItemView.vue')
                    },
                    {
                        path: 'vip',
                        component: () => import('../views/lotto/qlc/census/QlcCensusVipView')
                    },
                    {
                        path: 'hot',
                        component: () => import('../views/lotto/qlc/census/QlcCensusHotView')
                    },
                    {
                        path: 'high',
                        component: () => import('../views/lotto/qlc/census/QlcCensusHighView')
                    },
                ]
            },
            {
                path: 'master',
                component: () => import('../views/lotto/qlc/QlcMasterView.vue'),
                meta: {
                    name: '专家管理',
                    menu: true,
                }
            },
        ]
    },
    {
        path: '/kl8',
        name: 'kl8',
        component: LayoutContainer,
        redirect: '/kl8/index',
        meta: {
            name: '快乐八',
            remark: '快乐8管理',
            icon: 'icon icon-kl8',
            menu: true
        },
        children: [
            {
                path: 'index',
                component: () => import('../views/lotto/lottery/LotteryDataView.vue'),
                beforeEnter: (to, from, next) => {
                    Object.assign(to.query, {type: 'kl8'});
                    next();
                },
                meta: {
                    name: '开奖信息',
                    menu: true,
                }
            },
            {
                path: 'data',
                component: () => import('../views/lotto/kl8/Kl8DataView.vue'),
                meta: {
                    name: '预测数据',
                    menu: true,
                }
            },
            {
                path: 'recom',
                component: () => import('../views/lotto/kl8/Kl8RecomView.vue'),
                meta: {
                    name: '数据推荐',
                    menu: true,
                }
            },
            {
                path: 'master',
                component: () => import('../views/lotto/kl8/Kl8MasterView.vue'),
                meta: {
                    name: '专家管理',
                    menu: true,
                }
            }
        ]
    },

];

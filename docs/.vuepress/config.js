module.exports = {
    title: '八股速记',
    description: '面试前快速背诵八股',
    theme: 'reco',
    base: '/MyStudyNote/',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        subSidebar: 'auto',
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'Lansong的八股笔记',
                items: [
                    { text: 'Github', link: 'https://github.com/Lansongxx' },
                ]
            }
        ],
        sidebar: [
            {
                title: "操作系统",
                path: '/handbook/操作系统',
                collapsable: false, // 不折叠
            },
            {
                title: "Redis",
                path: '/handbook/Redis',
                collapsable: false,
            },
            {
                title: "Mysql",
                path: '/handbook/Mysql',
                collapsable: false,
            },
            {
                title: "Kafka",
                path: '/handbook/Kafka',
                collapsable: false,
            },
            {
                title: "计算机网络",
                path: '/handbook/计算机网络',
                collapsable: false,
            },
            {
                title: "MongoDB",
                path: '/handbook/MongoDB',
                collapsable: false,
            },
            {
                title: "6.824",
                path: '/handbook/6.824',
                collapsable: false,
            },
            {
                title: "Golang",
                path: '/handbook/Golang',
                collapsable: false,
            }
        ]
    }
}

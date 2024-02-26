module.exports = {
    // 站点配置
    lang: "zh-CN",
    title: '八股速记',
    description: '面试前快速背诵八股',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    plugins: [
        [
            "vuepress-plugin-baidu-tongji-analytics",
            {
                key: "ff378ce1bb78883924b7f4fca85a70de",
            },
        ],
    ],
    // 主题和它的配置
    theme: "@qcyblm/vpx",
    themeConfig: {
        subSidebar: 'auto',
        search: false,
        lastUpdated: "Last Updated",
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
        ],
        footer: {
            // 页脚信息
            createYear: "2024", // 创建年份 (可选，author、authorLink 启动时必选)
            author: "Lansong", // 作者 (可选)
            authorLink: "https://windliang.wang", // 作者链接 (可选)
            beianLink: "https://beian.miit.gov.cn/", // 备案链接 (可选)
        },
        repo: {
            platform: "https://github.com/", // 填写 Git 服务商链接
            icon: "fab fa-github", // 填写 icon 图标 (可选)
            label: "github",
            owner: "Lansongxx", //  填写 Git 项目仓库所有者
            repositories: "MyStudyNote", // 填写 Git 项目仓库
        },
    },
};

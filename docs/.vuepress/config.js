module.exports = {
    // 站点配置
    lang: "zh-CN",
    title: '八股速记',
    description: '面试前快速背诵八股',
    base: '/MyStudyNote/',
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
                text: '关于我',
                items: [
                    { text: 'Github', link: 'https://github.com/Lansongxx' },
                    { text: '知乎', link: 'https://www.zhihu.com/people/icand'},
                    { text: 'Codeforces', link: 'https://codeforces.com/profile/Lansong'},
                ]
            },
            {
                text: '八股交流群',
                link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=6ymyoBULBCcSPpH6bDPzPJbVnBXXytc8&authKey=3mjoM4lMl8vVKqX5iyumC24j%2FT5StPSIM%2BBNB4cxWyZZ%2B4xPWWmD2Tlp4cfjVXYF&noverify=0&group_code=747928275'
            }
        ],
        sidebar: [
            {
                title: "操作系统",
                path: '/handbook/操作系统',
                collapsable: true, // 不折叠
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
            },
            {
                title: "算法与数据结构",
                path: '/handbook/算法与数据结构',
                collapsable: false,
            },
            {
                title: "面经",
                path: '/handbook/面试经验',
                collapsable: false,
            },
            {
                title: "微服务",
                path: '/handbook/微服务',
                collapsable: false,
            }
        ],
        footer: {
            // 页脚信息
            createYear: "2024", // 创建年份 (可选，author、authorLink 启动时必选)
            author: "Lansong", // 作者 (可选)
            authorLink: "https://github.com/Lansongxx", // 作者链接 (可选)
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

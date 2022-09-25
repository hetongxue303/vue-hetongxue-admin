export const mockData = {
    "code": 200,
    "message": "登陆成功",
    "data": {
        "user": {
            "id": 1,
            "username": "admin",
            "password": "$2a$10$bCX3/UpZAUTm.7VnQShH2uRnhiQEZengG0lEzh2Klk0rqlqYC3AOq",
            "nickName": "hetongxue",
            "realName": "何同学",
            "phone": "15226523413",
            "email": "15226523413@163.com",
            "gender": "0",
            "avatarPath": ".....",
            "status": true,
            "createTime": 1660658210000,
            "updateTime": 1660658212000,
            "introduction": "暂无说明"
        },
        "authorities": [
            {
                "authority": "ROLE_admin,user:delete,user:update,user:list,user:insert,role:list,role:insert,role:delete,role:update,menu:delete,menu:update,menu:list,menu:insert"
            }
        ],
        "menus": [
            {
                "name": "首页",
                "path": "/dashboard",
                "icon": "user",
                "children": []
            },
            {
                "name": "系统管理",
                "path": "/system",
                "icon": "setting",
                "children": [
                    {
                        "name": "用户管理",
                        "path": "/system/user",
                        "icon": "user",
                        "children": []
                    },
                    {
                        "name": "角色管理",
                        "path": "/system/role",
                        "icon": "document",
                        "children": []
                    },
                    {
                        "name": "菜单管理",
                        "path": "/system/menu",
                        "icon": "document",
                        "children": []
                    }
                ]
            }
        ],
        "routers": [
            {
                "name": "system",
                "path": "/system",
                "component": "../layout/Index.vue",
                "meta": {
                    "title": "系统管理",
                    "icon": "setting",
                    "keepAlive": true,
                    "requireAuth": true,
                    "roles": null
                },
                "children": [
                    {
                        "name": "user",
                        "path": "/system/user",
                        "component": "../views/system/User.vue",
                        "meta": {
                            "title": "用户管理",
                            "icon": "document",
                            "keepAlive": true,
                            "requireAuth": true,
                            "roles": [
                                "user:delete",
                                "user:update",
                                "user:insert"
                            ]
                        },
                        "children": []
                    },
                    {
                        "name": "role",
                        "path": "/system/role",
                        "component": "../views/system/Role.vue",
                        "meta": {
                            "title": "角色管理",
                            "icon": "document",
                            "keepAlive": true,
                            "requireAuth": true,
                            "roles": [
                                "role:insert",
                                "role:delete",
                                "role:update"
                            ]
                        },
                        "children": []
                    },
                    {
                        "name": "menu",
                        "path": "/system/menu",
                        "component": "../views/system/Menu.vue",
                        "meta": {
                            "title": "菜单管理",
                            "icon": "document",
                            "keepAlive": true,
                            "requireAuth": true,
                            "roles": [
                                "menu:delete",
                                "menu:update",
                                "menu:insert"
                            ]
                        },
                        "children": []
                    }
                ]
            }
        ],
        "password": "$2a$10$bCX3/UpZAUTm.7VnQShH2uRnhiQEZengG0lEzh2Klk0rqlqYC3AOq",
        "enabled": true,
        "username": "admin",
        "accountNonExpired": true,
        "credentialsNonExpired": true,
        "accountNonLocked": true
    }
}
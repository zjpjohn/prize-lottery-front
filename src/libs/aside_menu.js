import routers from '../router/routes'

export const extractAside = () => {
    let routes = routers.filter(value => value.meta && value.meta.menu);
    if (routes == null || routes.length === 0) {
        console.error("没有从路由信息中找到菜单相关信息");
        return [];
    }
    let menus = [];
    for (let i = 0; i < routes.length; i++) {
        let item = routes[i];
        let root = item.path;
        if (!root.startsWith("/")) {
            root = "/" + root;
        }
        let main    = {};
        main.name   = item.meta.name;
        main.icon   = item.meta.icon;
        main.remark = item.meta.remark;
        menus.push(main);
        //当前路由页在主菜单显示
        if (item.meta.page) {
            main.path = root;
            continue;
        }
        //子菜单集合
        if (item.children && item.children.length > 0) {
            let subset   = [];
            main.submenu = subset;
            let children = item.children;
            for (let j = 0; j < children.length; j++) {
                let subItem = children[j];
                if (subItem.meta.menu) {
                    let menu    = {};
                    menu.name   = subItem.meta.name;
                    menu.parent = main.name;
                    let path    = subItem.path;
                    if (!path.startsWith("/")) {
                        path = "/" + path;
                    }
                    menu.path = root + path;
                    subset.push(menu);
                }
            }
        }
    }
    return menus;
};
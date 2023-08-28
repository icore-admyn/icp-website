import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL;
const cache: any = process.env.CACHE;

export async function getServerProps() {
    const res: any = await fetch(`${url}/api/menus/1?populate=*`, { cache: cache });
    return res.json();
}

export default async function getMenuData() {
    const serverProps = await getServerProps();
    const menuData = serverProps.data.attributes.items.data;
    const navArray: any = [];

    // Function to add a submenu item to a main menu
    function addSubmenuItem(submenu: any, menuItem: any) {
        const { title, url, target, order } = menuItem.attributes;
        const newItem = {
            name: title,
            url,
            target,
            order,
        };

        const insertIndex = submenu.findIndex((item: any) => item.order > order);
        if (insertIndex === -1) {
            submenu.push(newItem);
        } else {
            submenu.splice(insertIndex, 0, newItem);
        }
    }

    // Function to add a top-level menu item to the result
    function addTopLevelMenuItem(menuItem: any) {
        const { order, title, url, target, parentMenu, isButton } = menuItem.attributes;
        const newItem = {
            name: title,
            submenu: [],
            order,
            isButton,
            url,
            target
        };

        const insertIndex = navArray.findIndex((item: any) => item.order > order);
        if (insertIndex === -1) {
            navArray.push(newItem);
        } else {
            navArray.splice(insertIndex, 0, newItem);
        }
    }

    // Iterate through the provided data
    menuData.forEach((menuItem: any) => {
        const { order, title, url, target, parentMenu, isButton } = menuItem.attributes;

        // If it's a main menu item, add it to the result
        if (!parentMenu) {
            addTopLevelMenuItem(menuItem);
        }
        // Otherwise, find the matching main menu item and add it as a submenu
        else {
            const parentItem = navArray.find((item: any) => item.name === parentMenu);
            if (parentItem) {
                addSubmenuItem(parentItem.submenu, menuItem);
            } else {
                console.error(`Parent menu "${parentMenu}" not found for item "${title}"`);
            }
        }
    });

    return navArray;
}

import { copyToClipBoard } from "./utils";
import * as NativeUi from "./NativeUi/NativeUi.js";

export function initCopyCoordsMenu(menuItem: NativeUi.UIMenuItem, menu: NativeUi.Menu) {
    var includeHeading = false;
    const copyCoordsMenu = new NativeUi.Menu("Copy Coords", "Copy Coords in different formats", new NativeUi.Point(50, 50));
    copyCoordsMenu.Visible = false;
    copyCoordsMenu.GetTitle().Scale = 0.9;
    menu.AddSubMenu(copyCoordsMenu, menuItem);

    copyCoordsMenu.AddItem(new NativeUi.UIMenuCheckboxItem("Include Heading", false, "Inclue heading in the coords"));

    copyCoordsMenu.AddItem(new NativeUi.UIMenuItem("Copy Comma Seperated", "x,y,z"));

    copyCoordsMenu.AddItem(new NativeUi.UIMenuItem("Copy prefiex", "x = x, y = y, z = z"));

    copyCoordsMenu.CheckboxChange.on((_item: NativeUi.UIMenuCheckboxItem, checkedState: boolean) => {
        includeHeading = checkedState;
    });

    copyCoordsMenu.ItemSelect.on(
        (
            selectedItem: NativeUi.UIMenuListItem | NativeUi.UIMenuSliderItem | NativeUi.UIMenuCheckboxItem | NativeUi.UIMenuAutoListItem,
            selectedItemIndex: number
        ) => {
            if (selectedItem instanceof NativeUi.UIMenuItem) {
                var [x, y, z] = GetEntityCoords(PlayerPedId(), true);
                x = Number.parseFloat(x.toFixed(3));
                y = Number.parseFloat(y.toFixed(3));
                z = Number.parseFloat(z.toFixed(3));
                const h = includeHeading ? GetEntityHeading(PlayerPedId()).toFixed(3) : "";
                if (selectedItemIndex == 1) {
                    var message = `${x},${y},${z}`;
                    if (includeHeading) {
                        message = `${x},${y},${z},${h}`;
                    }
                    console.log(message);
                    copyToClipBoard(message);
                } else if (selectedItemIndex == 2) {
                    var message = `x = ${x}, y = ${y}, z = ${z}`;
                    if (includeHeading) {
                        message = `x = ${x}, y = ${y}, z = ${z}, h = ${h}`;
                    }
                    console.log(message);
                    copyToClipBoard(message);
                }
            }
        }
    );
}

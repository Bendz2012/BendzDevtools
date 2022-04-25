import { copyToClipBoard, getUserInput, sleep } from "./utils";
import * as NativeUi from "./NativeUi/NativeUi.js";

export function inintCreateMarkerMenu(menuItem: NativeUi.UIMenuItem, menu: NativeUi.Menu) {
    let markerType = 0;
    let [x, y, z] = GetEntityCoords(PlayerPedId(), true);
    let [dirX, dirY, dirZ] = [0.0, 0.0, 0.0];
    let [rotX, rotY, rotZ] = [0.0, 0.0, 0.0];
    let [scaleX, scaleY, scaleZ] = [1.0, 1.0, 1.0];
    let [colorR, colorG, colorB, colorA] = [255, 255, 255, 100];
    let [bobUpAndDown, faceCamera, rotate] = [false, false, false];
    const markerMenu = new NativeUi.Menu("Marker Menu", "", new NativeUi.Point(50, 50));
    markerMenu.Visible = false;
    markerMenu.GetTitle().Scale = 0.9;
    menu.AddSubMenu(markerMenu, menuItem);

    let markerTypeList = new NativeUi.UIMenuAutoListItem("Marker type", "", 0, 43, 0);
    markerMenu.AddItem(markerTypeList);

    let posX = new NativeUi.UIMenuItem("Position X", x.toFixed(3));
    markerMenu.AddItem(posX);
    let posY = new NativeUi.UIMenuItem("Position Y", y.toFixed(3));
    markerMenu.AddItem(posY);
    let posZ = new NativeUi.UIMenuItem("Position Z", z.toFixed(3));
    markerMenu.AddItem(posZ);

    let dirXItem = new NativeUi.UIMenuItem("Direction X", dirX.toFixed(1));
    markerMenu.AddItem(dirXItem);
    let dirYItem = new NativeUi.UIMenuItem("Direction Y", dirY.toFixed(1));
    markerMenu.AddItem(dirYItem);
    let dirZItem = new NativeUi.UIMenuItem("Direction Z", dirZ.toFixed(1));
    markerMenu.AddItem(dirZItem);

    let rotXItem = new NativeUi.UIMenuItem("Rotation X", rotX.toFixed(1));
    markerMenu.AddItem(rotXItem);
    let rotYItem = new NativeUi.UIMenuItem("Rotation Y", rotY.toFixed(1));
    markerMenu.AddItem(rotYItem);
    let rotZItem = new NativeUi.UIMenuItem("Rotation Z", rotZ.toFixed(1));
    markerMenu.AddItem(rotZItem);

    let scaleXItem = new NativeUi.UIMenuItem("Scale X", scaleX.toFixed(1));
    markerMenu.AddItem(scaleXItem);
    let scaleYItem = new NativeUi.UIMenuItem("Scale Y", scaleY.toFixed(1));
    markerMenu.AddItem(scaleYItem);
    let scaleZItem = new NativeUi.UIMenuItem("Scale Z", scaleZ.toFixed(1));
    markerMenu.AddItem(scaleZItem);

    let colorRItem = new NativeUi.UIMenuItem("Color Red", colorR.toString());
    markerMenu.AddItem(colorRItem);
    let colorGItem = new NativeUi.UIMenuItem("Color Green", colorG.toString());
    markerMenu.AddItem(colorGItem);
    let colorBItem = new NativeUi.UIMenuItem("Color Blue", colorB.toString());
    markerMenu.AddItem(colorBItem);
    let colorAItem = new NativeUi.UIMenuItem("Color Alpha", colorA.toString());
    markerMenu.AddItem(colorAItem);

    let bobUpAndDownItem = new NativeUi.UIMenuCheckboxItem("Bob up and down", bobUpAndDown);
    markerMenu.AddItem(bobUpAndDownItem);
    let faceCamerItem = new NativeUi.UIMenuCheckboxItem("Face camera", faceCamera);
    markerMenu.AddItem(faceCamerItem);
    let rotateItem = new NativeUi.UIMenuCheckboxItem("Rotate", rotate);
    markerMenu.AddItem(rotateItem);

    let copyMarkerItem = new NativeUi.UIMenuItem("Copy Marker", "Copy this marker to clipboard");
    markerMenu.AddItem(copyMarkerItem);

    markerMenu.MenuOpen.on(async () => {
        [x, y, z] = GetEntityCoords(PlayerPedId(), true);
        [dirX, dirY, dirZ] = [0.0, 0.0, 0.0];
        [rotX, rotY, rotZ] = [0.0, 0.0, 0.0];
        [scaleX, scaleY, scaleZ] = [1.0, 1.0, 1.0];
        [colorR, colorG, colorB, colorA] = [255, 255, 255, 100];
        [bobUpAndDown, faceCamera, rotate] = [false, false, false];
        posX.Description = x.toFixed(3);
        posY.Description = y.toFixed(3);
        posZ.Description = z.toFixed(3);
        while (markerMenu.Visible) {
            await sleep(0);
            DrawMarker(
                markerType,
                x,
                y,
                z,
                dirX,
                dirY,
                dirZ,
                rotX,
                rotY,
                rotZ,
                scaleX,
                scaleY,
                scaleZ,
                colorR,
                colorG,
                colorB,
                colorA,
                bobUpAndDown,
                faceCamera,
                2,
                rotate,
                null,
                null,
                false
            );
        }
    });

    markerMenu.AutoListChange.on((_item: NativeUi.UIMenuAutoListItem, newListItemIndex: number) => {
        markerType = newListItemIndex;
    });

    markerMenu.CheckboxChange.on((_item: NativeUi.UIMenuCheckboxItem, _checked: boolean) => {
        switch (_item.Text) {
            case "Bob up and down":
                bobUpAndDown = _checked;
                break;
            case "Face camera":
                faceCamera = _checked;
                break;
            case "Rotate":
                rotate = _checked;
                break;
        }
    });

    markerMenu.ItemSelect.on(
        async (
            selectedItem: NativeUi.UIMenuListItem | NativeUi.UIMenuSliderItem | NativeUi.UIMenuCheckboxItem | NativeUi.UIMenuAutoListItem,
            selectedItemIndex: number
        ) => {
            if (selectedItem instanceof NativeUi.UIMenuItem) {
                switch (selectedItem.Text) {
                    case "Position X":
                        x = await getUserInput("Position X", x.toFixed(3)).then(Number.parseFloat);
                        posX.Description = x.toFixed(3);
                        break;
                    case "Position Y":
                        y = await getUserInput("Position Y", y.toFixed(3)).then(Number.parseFloat);
                        posY.Description = y.toFixed(3);
                        break;
                    case "Position Z":
                        z = await getUserInput("Position Z", z.toFixed(3)).then(Number.parseFloat);
                        posZ.Description = z.toFixed(3);
                        break;
                    case "Direction X":
                        dirX = await getUserInput("Direction X", dirX.toFixed(1)).then(Number.parseFloat);
                        dirXItem.Description = dirX.toFixed(3);
                        break;
                    case "Direction Y":
                        dirY = await getUserInput("Direction Y", dirY.toFixed(1)).then(Number.parseFloat);
                        dirYItem.Description = dirY.toFixed(3);
                        break;
                    case "Direction Z":
                        dirZ = await getUserInput("Direction Z", dirZ.toFixed(1)).then(Number.parseFloat);
                        dirZItem.Description = dirZ.toFixed(3);
                        break;
                    case "Rotation X":
                        rotX = await getUserInput("Rotation X", rotX.toFixed(3)).then(Number.parseFloat);
                        rotXItem.Description = rotX.toFixed(3);
                        break;
                    case "Rotation Y":
                        rotY = await getUserInput("Rotation Y", rotY.toFixed(1)).then(Number.parseFloat);
                        rotYItem.Description = rotY.toFixed(3);
                        break;
                    case "Rotation Z":
                        rotZ = await getUserInput("Rotation Z", rotZ.toFixed(1)).then(Number.parseFloat);
                        rotZItem.Description = rotZ.toFixed(3);
                        break;
                    case "Scale X":
                        scaleX = await getUserInput("Scale X", scaleX.toFixed(1)).then(Number.parseFloat);
                        scaleXItem.Description = scaleX.toFixed(3);
                        break;
                    case "Scale Y":
                        scaleY = await getUserInput("Scale Y", scaleY.toFixed(1)).then(Number.parseFloat);
                        scaleYItem.Description = scaleY.toFixed(3);
                        break;
                    case "Scale Z":
                        scaleZ = await getUserInput("Scale Z", scaleZ.toFixed(1)).then(Number.parseFloat);
                        scaleZItem.Description = scaleZ.toFixed(3);
                        break;
                    case "Color Red":
                        colorR = await getUserInput("Color Red", colorR.toString()).then(Number.parseInt);
                        colorRItem.Description = colorR.toString();
                        break;
                    case "Color Green":
                        colorG = await getUserInput("Color Green", colorG.toString()).then(Number.parseInt);
                        colorGItem.Description = colorG.toString();
                        break;
                    case "Color Blue":
                        colorB = await getUserInput("Color Blue", colorB.toString()).then(Number.parseInt);
                        colorBItem.Description = colorB.toString();
                        break;
                    case "Color Alpha":
                        colorA = await getUserInput("Color Alpha", colorA.toString()).then(Number.parseInt);
                        colorAItem.Description = colorA.toString();
                        break;
                    case "Copy Marker":
                        let message = `DrawMarker(${markerType}, ${x}, ${y}, ${z}, ${dirX}, ${dirY}, ${dirZ}, ${rotX}, ${rotY}, ${rotZ}, ${scaleX}, ${scaleY}, ${scaleZ}, ${colorR}, ${colorG}, ${colorB}, ${colorA}, ${bobUpAndDown}, ${faceCamera}, 2, ${rotate}, null, null, false);`;
                        console.log(message);
                        copyToClipBoard(message);
                        break;
                }
            }
        }
    );
}

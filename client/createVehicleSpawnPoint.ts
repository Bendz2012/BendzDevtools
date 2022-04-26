import { copyToClipBoard, getUserInput, sleep, ShowAboveRadarMessage } from "./utils";
import * as NativeUi from "./nativeui/nativeui.js";

export function initCreateVehicleSpawnPoint(menuItem: NativeUi.UIMenuItem, menu: NativeUi.Menu) {
    let playerPed = PlayerPedId();
    let [x, y, z] = GetEntityCoords(playerPed, true);
    let heading = GetEntityHeading(playerPed);
    let vehicle: number = null;

    const vehicleSpawnPointMenu = new NativeUi.Menu("Vehicle Spawn Point", "", new NativeUi.Point(50, 50));
    vehicleSpawnPointMenu.Visible = false;
    vehicleSpawnPointMenu.GetTitle().Scale = 0.9;
    menu.AddSubMenu(vehicleSpawnPointMenu, menuItem);

    const getCurrentCoordsItem = new NativeUi.UIMenuItem("Get Current Coords", "Get Current Coords");
    vehicleSpawnPointMenu.AddItem(getCurrentCoordsItem);

    const spawnVehicleItem = new NativeUi.UIMenuCheckboxItem("Spawn vehicle", false);
    vehicleSpawnPointMenu.AddItem(spawnVehicleItem);

    // menu funtions
    vehicleSpawnPointMenu.MenuOpen.on(() => {
        [x, y, z] = GetEntityCoords(playerPed, true);
        heading = GetEntityHeading(playerPed);
    });

    vehicleSpawnPointMenu.MenuClose.on(() => {
        if (vehicle !== null) {
            DeleteVehicle(vehicle);
            vehicle = null;
            spawnVehicleItem.Checked = false;
        }
    });

    vehicleSpawnPointMenu.ItemSelect.on((item: NativeUi.UIMenuItem, index: number) => {
        if (item.Text == "Get Current Coords") {
            [x, y, z] = GetEntityCoords(playerPed, true);
            heading = GetEntityHeading(playerPed);
        }
    });

    vehicleSpawnPointMenu.CheckboxChange.on((_item: NativeUi.UIMenuCheckboxItem, _checked: boolean) => {
        switch (_item.Text) {
            case "Spawn vehicle": {
                spawnVehicleItem.Checked = _checked;
                if (_checked) {
                    vehicle = spawnVehicle("adder", x, y, z, heading);
                } else {
                    DeleteVehicle(vehicle);
                    vehicle = null;
                }
            }
        }
    });
}

function spawnVehicle(model: string, x: number, y: number, z: number, heading: number): number {
    let hash = GetHashKey(model);
    RequestModel(hash);
    while (!HasModelLoaded(hash)) {
        sleep(0);
    }

    let vehicle = CreateVehicle(hash, x, y, z, heading, false, false);
    SetEntityAsMissionEntity(vehicle, true, true);
    if (!SetVehicleOnGroundProperly(vehicle)) {
        ShowAboveRadarMessage("~r~Could not set vehicle on ground properly");
    }
    FreezeEntityPosition(vehicle, true);
    SetEntityCollision(vehicle, false, false);
    return vehicle;
}

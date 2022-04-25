import * as NativeUi from "./nativeui/NativeUi.js";
import { initCopyCoordsMenu } from "./copyCoordsMenu";
import { inintCreateMarkerMenu } from "./createMarkerMenu";

const menu = new NativeUi.Menu("Bendz Devtools", "", new NativeUi.Point(50, 50));

menuInit();

RegisterCommand(
    "devTools",
    () => {
        emit("BendzDevtools:Toggle");
    },
    false
);

onNet("BendzDevtools:Toggle", () => {
    menu.Visible = !menu.Visible;
});

function menuInit() {
    menu.Visible = false;
    menu.GetTitle().DropShadow = true;

    let copyCoordsItem = new NativeUi.UIMenuItem("Copy Coords", "Copy Coords in different formats");
    menu.AddItem(copyCoordsItem);

    initCopyCoordsMenu(copyCoordsItem, menu);

    let createMarkerItem = new NativeUi.UIMenuItem("Create Marker", "Create Marker easily");
    menu.AddItem(createMarkerItem);

    inintCreateMarkerMenu(createMarkerItem, menu);
}
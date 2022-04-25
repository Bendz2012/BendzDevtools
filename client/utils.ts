export const sleep = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export function copyToClipBoard(message: string) {
    SendNuiMessage(
        JSON.stringify({
            coords: message,
        })
    );
}

export async function getUserInput(windowTitle: string = "", defaultText: string = "") {
    DisplayOnscreenKeyboard(0, windowTitle, "", defaultText, "", "", "", 64);
    var input = true;
    var inputText = "";
    while (input == true) {
        await sleep(0);
        HideHudAndRadarThisFrame();
        if (UpdateOnscreenKeyboard() == 1) {
            inputText = GetOnscreenKeyboardResult();
            input = false;
        } else if (UpdateOnscreenKeyboard() == 2) {
            inputText = defaultText;
            input = false;
        }
    }
    return inputText;
}

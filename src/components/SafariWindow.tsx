import Window, { type WindowInstance, type WindowManager } from "./Window";

function SafariWindow(instance: WindowInstance & WindowManager) {
    return <Window {...instance} />
}

export default SafariWindow
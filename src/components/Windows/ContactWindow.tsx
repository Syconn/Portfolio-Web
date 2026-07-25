import type { WindowInstance, WindowManager } from "./Window"
import Window from "./Window"

function ContactWindow(instance: WindowInstance & WindowManager) {
    return <Window {...instance} />
}

export default ContactWindow
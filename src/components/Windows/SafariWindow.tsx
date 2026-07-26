import Window, { type WindowInstance, type WindowManager } from "./Window";
import "../../css/Safari.css"
import { FaArrowLeft, FaArrowRight, FaGlobe, FaLock, FaPlus } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";

function SafariWindow(instance: WindowInstance & WindowManager) {
    return (
        <Window {...instance} header={<div className="safari-window-title">Safari</div>}>
            <div className="safari">

                <div className="safari-tabs">
                    <div className="safari-tab active">
                        <FaGlobe />
                        <span>New Tab</span>
                        <button>×</button>
                    </div>

                    <button className="new-tab">
                        <FaPlus />
                    </button>
                </div>


                <div className="safari-toolbar">

                    <div className="navigation-buttons">
                        <button>
                            <FaArrowLeft />
                        </button>

                        <button>
                            <FaArrowRight />
                        </button>

                        <button>
                            <FaRotateRight />
                        </button>
                    </div>


                    <div className="address-bar">
                        <FaLock />
                        <span>
                            Search or enter website name
                        </span>
                    </div>


                    <button className="toolbar-button">
                        ☰
                    </button>

                </div>


                <div className="safari-page">
                    {/* Website content goes here */}
                </div>

            </div>
        </Window>
    );
}

export default SafariWindow
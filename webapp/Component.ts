import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import XMLView from "sap/ui/core/mvc/XMLView";

/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {

    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"]
    }

    onInit(): void {
        // call superclass init 
        super.init();
    }

    createContent(): Control | Promise<Control | null> | null {
        return XMLView.create({
            "viewName": "ui5.walkthrough.views.App",
            "id": "app"
        })
    }

}
import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import XMLView from "sap/ui/core/mvc/XMLView";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {

    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"],
        "manifest": "json"
    }

    onInit(): void {
        // call superclass init 
        super.init();

        // const data = {
        //     recipient: {
        //         name : "Ricky"
        //     }
        // };
        // const model = new JSONModel(data);
        // this.setModel(model);
    }
}
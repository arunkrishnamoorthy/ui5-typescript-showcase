import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {

    onInit(): void {
        const data = {
            recipient: {
                name : "Ricky"
            }
        };
        const model = new JSONModel(data);
        this.getView()?.setModel(model);

        // const resourceModel = new ResourceModel({
        //     bundleName: "ui5.walkthrough.i18n.i18n"
        // });
        // this.getView()?.setModel(resourceModel,"i18n");
    }


    onPress(): void {
        const recipient = (<JSONModel>this.getView()?.getModel())?.getProperty('/recipient/name');
        const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n")).getResourceBundle();
        const message = resourceBundle.getText("messageText", [recipient]) || "no text defined";
        MessageToast.show(message);              
    }
}
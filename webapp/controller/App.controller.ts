import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {

    onPress(): void {
        MessageToast.show("This is a message from UI5 message toast");
    }
}
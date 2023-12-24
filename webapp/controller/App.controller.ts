import Controller from "sap/ui/core/mvc/Controller";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {

    onPress(): void {
        alert("Text from controller");
    }
}
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import formatter from "../model/formatter";
/**
 * @name ui5.walkthrough.controller.InvoiceList
 */
export default class InvoiceList extends Controller {

    public formatter = formatter;

    onInit(): void {
        const currencyModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(currencyModel,"view");
    }
}
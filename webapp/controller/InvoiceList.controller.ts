import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import formatter from "../model/formatter";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
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

    onFilterInvoices(event: SearchField$SearchEvent): void {
        const filter = [];
        const query = event.getParameter("query");
        if(query) {
            filter.push(new Filter("ProductName",FilterOperator.Contains,query));
        }
        const list = this.byId("invoiceList");
        const binding = <ListBinding>list?.getBinding("items");
        binding?.filter(filter);
    }
}
import XMLView from "sap/ui/core/mvc/XMLView";

XMLView.create({
    viewName: "ui5.walkthrough.views.App"
}).then((view) => {
    view.placeAt("content");
})
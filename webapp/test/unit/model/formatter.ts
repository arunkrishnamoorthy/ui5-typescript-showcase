import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import formatter from "ui5/walkthrough/model/formatter";

QUnit.module("Formatting function", {});

QUnit.test("Should return translated texts", (assert) => {

//    const resourceModel = new ResourceModel({
//     bundleUrl: sap.ui.require.toUrl("ui5/walkthrough/i18n/i18n.properties"),
//     supportedLocales: [""],
//     fallbackLocale: ""
//    });

   // In the statusText we have function call this.getOwnerComponent().getModel() which returns the resource model. 
   // to mimick it create a mock function to create replicate this. 
//    const controllerMock = <Controller> <any>{
//         getOwnerComponent() {
//             return {
//                 getModel() {
//                     return resourceModel;
//                 }
//             }
//         }
//    }

   // Execute formatter statusText module. 
//    const fnFormatter = formatter.statusText.bind(controllerMock);

   // Assert
//    assert.strictEqual(fnFormatter("A"),"New", "The long text for A is new, correct");
//    assert.strictEqual(fnFormatter("B"),"In Progress", "The long text for B is In progress, correct");
//    assert.strictEqual(fnFormatter("C"),"Done", "The long text for C is Done, correct");
//    assert.strictEqual(fnFormatter("Foo"),"Foo", "The long text for Foo  correct");
});
import UriParameters from "sap/base/util/UriParameters"
import MockServer from "sap/ui/core/util/MockServer"

export default {

    init : function() {
        const mockServer = new MockServer({
            rootUri: sap.ui.require.toUrl("ui5/walkthrough/V2/Northwind/Northwind.svc/")
        })
        const uriParameters = new UriParameters(window.location.href);

        MockServer.config({
            autoRespond: true,
            autoRespondAfter: parseInt(uriParameters.get("serverDelay") || "500")
        })

        const path = sap.ui.require.toUrl("ui5/walkthrough/localService");
        mockServer.simulate(path + "/metadata.xml", path + "/mockdata");

        mockServer.start();
    }

}
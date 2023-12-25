### Typescript UI5 Tutorials 

In this series of tutorials, i will take you throught the Typescript mode of development. 


#### Step 1: Hello World

What did i learn in Step1: 

1. UI5 manifest file is needed by the Ui5 tooling to start the UI appliation. 
2. Contents of Manifest needed for this step. 
    a.  _version 
    b. sap.app section 
3. In the sap.app section following properties are needed. 
    ```
        {
        "_version": "1.60.0",
        "sap.app": {
            "id": "ui5.walkthrough"
            "type": "application",
            "title": "UI5 TypeScript Walkthrough",
            "applicationVersion": {
            "version": "1.0.0"
            }
        }
        }
    ```
4. package.json file is added to install the NPM module. 
5. To install the ui5 tooling, run the command to install the ui5 command line interface 
    ```node
    npm install --save-dev @ui5/cli
    ```
6. After the CLI tools are added, run the following command to initialize the ui5 yaml file. 
    ```node
    ui5 init
    ```
7. In the package.json file add the `start` script to start the web server. 
    ```json
        "scripts": {
            "start" : "ui5 server -o index.html"
        }
    ```
8. Run the `start` script to start the application server. 
    ```
        npm run start
    ```


#### Step2: Bootstrapping 

Before we start working with ui5, we need to load and intialize them. The process of loading and intializing the ui5 module is called bootstrapping. In this exercise what we will do is, we trigger an alert message after the bootstrapping is done. 


1. Install the typescript globally or as dev dependency, if typescript package is not there already.

```
npm install typescript --save-dev
```

2. Create a typescript configuration file `tsconfig.json`. This can also be done running the command `tsc init`. 
For the sake of simplicity, i am using the same config as provided in the documentation. 

```json
{
    "compilerOptions": {
      "target": "es2022",
      "module": "es2022",
      "moduleResolution": "node",
      "skipLibCheck": true,
      "allowJs": true,
      "strict": true,
      "strictPropertyInitialization": false,
      "rootDir": "webapp",
      "baseUrl": "./",
      "paths": {
        "ui5/walkthrough/*": ["webapp/*"]
      }
    },
    "include": ["webapp/**/*"]
  }
```

3. Add an `index.ts` file to the `webapp` folder and trigger an javascript alert message. 

```js
alert("UI5 is ready")
```

what happens is after the bootstrapping of the ui5 modules is done, system triggers the `index.js` file. 


4. Add the bootstrapping information in the index.html page. To do so, add a script tag and the script tag 
should have properties exactly as defined in the framework. 

    a. id of the script tag must be `sap-ui-bootstrap`
    b. src attribute of script refers to the ui5 runtime and intialize them along with addition resources, as specified in the data-* attributes.   
    e.g data-sap-ui-theme references the library themes to be loaded. 

5. `sap_horizon` is the default theme. 
    `data-sap-ui-theme="sap_horizon"`

6. Compatibility version = Edge, to use the most recent functionality of UI5, compatibility version is used as edge. 
    `data-sap-ui-compatVersion="edge"`

7. Load the ui5 resource asynchronously for performance reasons. 
    `data-sap-ui-async="true"`

8. Using the onInit data attribute, load the index module. 
    `data-sap-ui-onInit="module:ui5/walkthrough/index"`

9. The resource roots attributes let you map a namespace to the specific path. 
    ```data-sap-ui-resourceroots='{
			"ui5.walkthrough": "./"
		}'```


The end result of the script tag should like this. 

```html
    <script
		id="sap-ui-bootstrap"
		src="resources/sap-ui-core.js"
		data-sap-ui-theme="sap_horizon"
		data-sap-ui-compatVersion="edge"
		data-sap-ui-async="true"
		data-sap-ui-onInit="module:ui5/walkthrough/index"
		data-sap-ui-resourceroots='{
			"ui5.walkthrough": "./"
		}'>
	</script>
```

10. Open terminal and add the ui5 tooling. 

    `ui5-middleware-livereload` - middleware for ui5-server to live reload upon changes to the files.
    `ui5-middleware-serveframework` - middleware for ui5-server to deliver open ui5 framework locally built version.
    `ui5-tooling-transpile` - transpile modern javascript and typescript script compatible code. 

11. Add additional configuration for ui5 tooling set up. 
    
    add latest version of ui5 using the following command. 
    `ui5 use OpenUI5` 

    add the core library and horizon theme. 
    `ui5 add sap.ui.core themelib_sap_horizon`


12. Add ui5 tooling transpile task to run after replace task. 


Final version of ui5.yaml file should look like this.

```
specVersion: "3.2"
metadata:
  name: ui5-typescript-showcase
type: application
framework:
  name: OpenUI5
  version: "1.120.2"
  libraries:
    - name: sap.ui.core
    - name: themelib_sap_horizon
builder:
  customTasks:
  - name: ui5-tooling-transpile-task
    afterTask: replaceVersion
server:
  customMiddleware:
  - name: ui5-tooling-transpile-middleware
    afterMiddleware: compression
  - name: ui5-middleware-serveframework
    afterMiddleware: compression
  - name: ui5-middleware-livereload
    afterMiddleware: compression
```

#### Step3: Controls 

To add the type definitions to the typescript, we need to import a types packages for the Open UI5. 

For Open UI5:

```
npm install @types/openui5 --save-dev
```

For SAP UI5: 
```
npm install @types/sapui5 --save-dev
```

Replace the code in the index.ts file 

```
import Text from "sap/m/Text";

new Text({ text: "Text from Index.ts"}).placeAt("content");
```

Also modify the index.html page body to have a placeholder for content. 

```html
<body>
    <div id="content" class="sapUiBody"></div>
</body>
```

For sap ui5 tooling, run the command add to add the mobile library to dependencies

```
    ui5 add sap.m
```

#### Step4: XML Views 

The usage of XML view allow us to seperate the UI logic from Application Logic by declaring its own controller. 

Add a new folder named `views` in the webapp folder and create a file named `App.view.xml`

View declaration. 

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
</mvc:View>
```

Inside the view content, add the declarative definition for the Text control. 

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Text text="Text from XML View"/>
</mvc:View>
```

Adjust the code in the `index.ts` file to instantiate the xml view instead of Text control. 

```js
import XMLView from "sap/ui/core/mvc/XMLView";

XMLView.create({
    viewName: "ui5.walkthrough.views.App"
}).then((view) => {
    view.placeAt("content");
})
```

#### Step5: Adding controllers to the application. 

In the webapp folder create a new folder named `controller` and create a controller file with the same name as the view. 

`App.controller.ts`

In the controller file, extend the sap standard controller from `sap.ui.core.mvc.Controller` and extend the class. 

```js
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {

    onPress(): void {
        alert("Text from controller");
    }
}
```

Reference the controller in the XML view using the `controllerName` attribute. 

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc"
   controllerName="ui5.walkthrough.controller.App">
   <Text text="Text from XML View"/>
</mvc:View>
```

In the xml view add a button controller and assign the onPress event created in the controller to the press event of the button. 

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc"
   controllerName="ui5.walkthrough.controller.App">
   <Text text="Text from XML View"/>
   <Button text="Hello" press="onPress" />
</mvc:View>
```

Notes: 
1. Controller names are Capitalized
2. All controllers are in controller folder. 
3. 1..1 relationship between view and controller. 
4. Event handlers are prefixed with `on`
5. controller names must use the typescript extension. `*.controller.ts`


#### Step 6: Modules 

The resources in ui5 are often referred to as Modules. In this step we replace the Javascript alert message with a proper
message toast from ui5. 

Add the following code in the controller. 

```ts
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
```

#### Step 7: Adding JSON Module. 

In this step we will create a model and bind the data to the view. 

Introduce an UI5 lifecycle method onInit, which is invoked when the controller is created. It is similar to constructor of a class.  Instantiate the JSON model and set a sample data to it. 

```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";

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
    }


    onPress(): void {
        MessageToast.show("This is a message from UI5 message toast");
    }
}
```

In the view, lets add an input control and and bind the data. 

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc"
   controllerName="ui5.walkthrough.controller.App">
   <Button text="Hello" press="onPress" />
   <Input value="Hello {/receipient/name}"></Input>
</mvc:View>
```

#### Step 8: Translatable Texts

i18n - short name of internationalization
i18n uses similar syntax to data binding, but without the /

To add the i18n texts, create a folder named `i18n` in the webapp folder. in that folder, create a file named 
`i18n.properties`.

Add the following lines in the i18n.properties file. 

```text
buttonText = Say Hello 
messageText = Hello {0}
```

The `{0}` represents the placeholder. 

The file `i18n.properties` defaults to english language, where for other language file, you create a file with same name but with the extension of the language code. For example, for dutch, you create a file named `i18n_nl.properties` where `nl` is the dutch language code.

In the `onInit` of the controller instantiate the resource module.


```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

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

        const resourceModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
        });
        this.getView()?.setModel(resourceModel,"i18n");
    }


    onPress(): void {
        MessageToast.show("This is a message from UI5 message toast");
    }
}
```

only one model can be a default model, so the resource model is referenced with the name `i18n` and the same will be used in the bindings. 

In the view bind the button text from the i18n model.

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc"
   controllerName="ui5.walkthrough.controller.App">
   <Button text="{i18n>buttonText}" press="onPress" />
   <Input value="{/recipient/name}" valueLiveUpdate="true"></Input>
</mvc:View>
```

During on press event, in the message, to fill the place holder we will need the reference of the ResourceBundle. 
With the help of resource bundle we will form the text by filling placeholder and raise the message. do the following modification in the controller. 

```ts
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

        const resourceModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
        });
        this.getView()?.setModel(resourceModel,"i18n");
    }


    onPress(): void {
        const model = this.getView()?.getModel() as JSONModel;
        const recipient = model.getProperty('/recipient/name');
        const resourceModel = this.getView()?.getModel("i18n") as ResourceModel;
        const resourceBundle = resourceModel.getResourceBundle() as ResourceBundle;
        const message = resourceBundle.getText("messageText", [recipient]) || "no text defined";
        MessageToast.show(message);
    }
}
```

Alternate way of referencing types in typescript. 

```ts
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
        const resourceModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
        });
        this.getView()?.setModel(resourceModel,"i18n");
    }
    onPress(): void {
        const recipient = (<JSONModel>this.getView()?.getModel())?.getProperty('/recipient/name');
        const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n")).getResourceBundle();
        const message = resourceBundle.getText("messageText", [recipient]) || "no text defined";
        MessageToast.show(message);              
    }
}
```

Notes:
1. Resource models are called i18n model 
2. Default file name is i18n.properties 
3. Bundle keys are written in lowerCase (recommendation)
4. Bundle values can contains place holder like {0}, {1}, .. and so on. 
5. Do not concatenate strings, always use placeholders
6. Use unicode escape sequence for special characters. 

#### Step 9: Component configuration 

Components are independent and reusable parts. it encapsulates all the UI assets from the index.html page. 

In the webapp folder create a file named `Component.ts`. This file is commonly referred as `Component Controller`. The controller of the `mvc` architecture.  The name of the file has to `Component`. it must not be changed. 

A Component has unique namespace synonymous with the application namespace. earlier in the manifest.js we provided application namespace as `ui5.walkthrough` and the same will be used in the Component. 

We define component by extending standard component `sap.ui.core.UIComponent`.

```ts
import UIComponent from "sap/ui/core/UIComponent";
/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {
    public static metadata = {
    }
    onInit(): void {       
    }
}
```

It is recommended to implement the interface `sap/ui/core/IAsyncContentCreation` in the `interfaces` settings of the manifest. 
This allows the component to be generated asynchronously. 

```ts
import UIComponent from "sap/ui/core/UIComponent";
/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {
    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"]
    }
    onInit(): void {   
    }
}
```

Call the `createContent` hook of the component and add the xml view as the content of the component. 

```ts
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
```

>Note: i left the model logic in the controller itself, if required will change it later. 


Finally, to dispaly the component in the output, replace the logic in the index.ts file. 
Using the Component Container class to initalize and place the component. 

```ts
import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    name: "ui5.walkthrough",
    settings: {
        id  : "walkthroughts"
    },
    async: true
}).placeAt("content");
```

Now visually there won't be any change, but we are using the component to dispaly the contents. 

#### Step 10: Application Descriptors 

The fiori launchpad uses the application container (Component) and instantiates the app without having the need to use index.html page.  Instead of html file, the descriptor(manifest.json) will be parsed and component is loaded into html page. 

We can use the descriptors to instantiate models, resource bundles etc. 

In the sap.app section of manifest, add the title and description.

```json
{
    "_version": "1.60.0",
    "sap.app" : {
        "id": "ui5.walkthrough",
        "type": "application",
        "title": "UI5 Walkthrough",
        "description": "UI5 walkthrough description",
        "applicationVersion": {
            "version": "1.0.0"
        }
    }
}
```

These descriptor information for the title will be used in the fiori launchpad. To translate the app title and app description. Add the texts in the i18n.properties files and reference it in the manifest.json file using the handlebar syntax. 

```txt
buttonText = Say Hello 
messageText = Hello {0}

appTitle = UI5 Walkthrough 
appDescription = UI5 Walkthrough description
```

In the manifest, use the handlerbar syntax `{{binding}}`. This by default references to the resource model. 
This system is different from the data binding syntax used in the view. The handlebar syntax only works in the manifest.json file. 

```json
{
    "_version": "1.60.0",
    "sap.app" : {
        "id": "ui5.walkthrough",
        "type": "application",
        "title": "{{appTitle}}",
        "description": "{{appDescription}}",
        "applicationVersion": {
            "version": "1.0.0"
        }
    }
}
```

Earlier, we created the resource model , inside the controller, now this step can be added to the manifest and the model get instantiated when the ui5 application starts. update the sap.app section of the manifest with resource bundle information. 

```json
{
    "_version": "1.60.0",
    "sap.app" : {
        "id": "ui5.walkthrough",
        "type": "application",
        "title": "{{appTitle}}",
        "description": "{{appDescription}}",
        "applicationVersion": {
            "version": "1.0.0"
        },
        "i18n": {
            "bundleName": "ui5.walkthrough.i18n.i18n",
            "supportedLocales": [
                ""
            ],
            "fallbackLocale": ""
        }  
    }
}
```

This only references the i18n file location to the application, the model instantiation part will follow later in the settings sap.ui5. 

bundleName -> references resource bundle file. File is referenced using the dot.notation. 
supportedLocales -> defines array of supported languages, eg. en_GB, en or de.. In this app only i18n is used so it is left blank. But adding this locales helps in controlling the fallback chain and prevent uncessary and potenitally failing requests. 

fallbackLocale -> specifies the fallback locale, by default set to en. 


In addition to sap.app, there are two other namespaces. sap.ui and sap.ui5. 

First lets add the sap.ui namepsace in the manifest. The sap.ui namespace contains the following.

1. technology -specify the technology used. its value is UI5. 
2. deviceTypes(mandatory) - Its is an object containing three boolean properties, Desktop, Table, Mobile. Setting true to these property indicate that the application is designed for the specific device type. By configuring this we ensure the app is optimized for specific device types. 

```json
"sap.ui": {
        "technology": "UI5",
        "deviceTypes": {
            "desktop": true,
            "tablet": true,
            "phone": true
        }
    },
```

In the sap.ui5 the most important parameters are. 

1. dependencies (mandatory) - 
    minUI5Version - minimum version of UI5 rrequired by the component. 
    libs -> declare the lib dependencies here to benefit from the asynchronous loading. We can set the parameter lazy to true to enable lazy loading of library. if app requires requires a min version of library to be loaded. We ncan specify minVersion as well. 

2. rootView -> root view of the application. This view is displayed when the component is loaded. 
        viewName -> view file name is referenced in dot notation. 
        type -> Type of the view (default: XML)
        id -> id for the view. 
        async -> load the view asynchronously.

3. models -> defines the global model that is controlled by the lifecycle of the application. The models defined here are available throughout the application. each model has a unique key. default model is represented by "". 

4. Content densities, provide option to enable/disable content densities for cozy and compact mode.

the sap.ui5 section would look like this.

```json
    "sap.ui5": {
        "dependencies": {
            "minUI5Version": "1.120.0",
            "libs": {
                "sap.ui.core": { "minVersion": "1.120.0"},
                "sap.m": {}
            }
        },
        "contentDensities": {
            "compact": true,
            "cozy": false
        },
        "rootView": {
            "viewName": "ui5.walkthrough.views.App",
            "type": "XML",
            "id": "app",
            "async": true
        },
        "models": {
            "i18n": {
                "type": "sap.ui.model.resources.ResourceModel",
                "settings": {
                    "bundleName": "ui5.walkthrough.i18n.i18n",
                    "supportedLocales": [

                    ],
                    "fallbackLocale": ""
                }
            }
        }
    }
```

in the component file, we can go ahead and instruct the componet to use the manifest by setting the manifest property in the metadata to true. 

```ts
import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import XMLView from "sap/ui/core/mvc/XMLView";

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
    }
}
```

From the controller file, i have removed the logic that instantiates the resource model. 

```js
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

```

now that we specified the root view in the manifest we no longer need to create content of the app manually, we will use a simple and straight forward approach to add the component in index.html. This will only be used when executing index.html page. the fiori launchpad will use the Component.ts and manifest.json to render the component. 

In the bootstrapping script, do the changes to remove the index module and load the Component support from sap.ui.core. 

#### Step 11: Pages and Panel

In this step we will replace the root view (App) with the page and panel container. 
We add displayBlock = "true" 
App Container and Page inside the app container aggregation. 
And panel inside the page aggregation. 

```xml
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="ui5.walkthrough.controller.App"
    displayBlock="true"
>
    <App>
        <pages>
            <Page title="{i18n>pageTitle}">
                <Panel headerText="{i18n>panelHeader}">
                    <Button
                        text="{i18n>buttonText}"
                        press="onPress"
                    />
                    <Input
                        value="{/recipient/name}"
                        valueLiveUpdate="true"
                    />
                </Panel>
            </Page>
        </pages>
    </App>
</mvc:View>

```

Also define the i18n properties for the new texts. 

```txt
pageTitle = Walkthrough
panelHeader=Hello World
```

#### Shell Container. 

In this exerices we will wrap the root of the application inside the Shell container. This will act as a outermost control and automatically wraps the component in so called letterbox if the screen size is larger than a certain width. 

This is not requried for the application that runs in the fiori launchpad, as the launchpad has shell wrapped around a component by default. 

```xml
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="ui5.walkthrough.controller.App"
    displayBlock="true"
>
    <Shell>
        <App>
            <pages>
                <Page title="{i18n>pageTitle}">
                    <Panel headerText="{i18n>panelHeader}">
                        <Button
                            text="{i18n>buttonText}"
                            press="onPress"
                        />
                        <Input
                            value="{/recipient/name}"
                            valueLiveUpdate="true"
                        />
                    </Panel>
                </Page>
            </pages>
        </App>
    </Shell>
</mvc:View>
```

#### Step 13: Paddings and Margins . 

`sapUiResponsiveMargin` - Provide margin on all sides. Apply this class to panel. 
Add width to panel to restrict the flow to 100%. 

`sapUiSmallMarginEnd` add to button to provide a margin to the right 

set input control width to 60% 

Add a text element and display name. add the `sapUiSmallMargin` to create margin on all sides. 

More details on available standard margins:
https://sapui5.hana.ondemand.com/#/topic/777168ffe8324873973151dae2356d1c.html

https://sapui5.hana.ondemand.com/#/topic/c71f6df62dae47ca8284310a6f5fc80a


#### Step 14: Custom CSS Styles

To define custom sytles, in the webapp folder create a folder named `css` and add a file name `style.css` in it.

add the following style class to the file. 

```css
.myAppDemoWT .myCustomText {
    display: inline-block;
    font-weight: bold;
}
```

To link the css to the application, in the manifest.json add the reference of the styles in the sap.ui5 section. 

```json
        "resources": {
            "css" :[
                {
                    "uri": "css/style.css"
                }
            ]
        },
```

Assign the custom sytle class to the control. 

```xml
        <App class="myAppDemoWT">
            <pages>
                <Page title="{i18n>pageTitle}">
                    <Panel headerText="{i18n>panelHeader}" class="sapUiResponsiveMargin" width="auto">
                        <Button
                            text="{i18n>buttonText}"
                            press="onPress"
                            class="sapUiSmallMarginEnd"
                        />
                        <Input
                            value="{/recipient/name}"
                            valueLiveUpdate="true"
                            width="60%"
                        />
                        <Text text="Hello {/recipient/name}" class="sapUiSmallMargin myCustomText" />
                    </Panel>
                </Page>
            </pages>
        </App>
```

For right to left and left to right languages, we can assign custom styles like following. 

```css
html[dir="ltr"] .myAppDemoWT .myCustomButton.sapMBtn {
   margin-right: 0.125rem
}

html[dir="rtl"] .myAppDemoWT .myCustomButton.sapMBtn {
   margin-left: 0.125rem
}
```

Adding the style class to the button.

```xml
    <Button
        text="{i18n>buttonText}"
        press="onPress"
        class="sapUiSmallMarginEnd myCustomButton"
    />
```

You can also add adjustable color from theme parameters. 

reference: https://openui5nightly.hana.ondemand.com/topic/ea08f53503da42c19afd342f4b0c9ec7

```xml
    <Text text="Hello {/recipient/name}" class="sapUiSmallMargin myCustomText sapThemeHighlight-asColor" />
```

#### Step 15: Nested Views 

At the end of this step, the layout will still remain the same. We are going to take the panel content of the App view 
and move it into a different view and embed the output here. 

Introduce a new view in the application.
views -> HelloPanel.view.xml 
controller -> HelloPanel.controller.ts

File: `HelloPanel.view.xml`

```xml 
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="ui5.walkthrough.controller.HelloPanel"
    displayBlock="true"
>
    <Panel
        headerText="{i18n>panelHeader}"
        class="sapUiResponsiveMargin"
        width="auto"
    >
        <Button
            text="{i18n>buttonText}"
            press="onPress"
            class="sapUiSmallMarginEnd myCustomButton"
        />
        <Input
            value="{/recipient/name}"
            valueLiveUpdate="true"
            width="60%"
        />
        <Text
            text="Hello {/recipient/name}"
            class="sapUiSmallMargin myCustomText sapThemeHighlight-asColor"
        />
    </Panel>
</mvc:View>
```

File: `HelloPanel.controller.ts`

```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @name ui5.walkthrough.controller.HelloPanel
 */
export default class HelloPanel extends Controller {

    onInit(): void {
        const data = {
            recipient: {
                name : "Ricky"
            }
        };
        const model = new JSONModel(data);
        this.getView()?.setModel(model);
    }


    onPress(): void {
        const recipient = (<JSONModel>this.getView()?.getModel())?.getProperty('/recipient/name');
        const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n")).getResourceBundle();
        const message = resourceBundle.getText("messageText", [recipient]) || "no text defined";
        MessageToast.show(message);              
    }
}
```

File: `App.controller.ts`

```ts
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {

    onInit(): void {}
     
}
```

File: `App.view.xml`

```xml
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="ui5.walkthrough.controller.App"
    displayBlock="true"
>
    <Shell>
        <App class="myAppDemoWT">
            <pages>
                <Page title="{i18n>pageTitle}">
                    <mvc:XMLView viewName="ui5.walkthrough.views.HelloPanel"></mvc:XMLView>
                </Page>
            </pages>
        </App>
    </Shell>
</mvc:View>
```

The output still remains the same. We have only modified the content from one view to another and nested the views. 

#### Step 16: Dialog and Fragments 

Fragments are lightweight and can be reused across the views. It does not have a controller of its own . 

in the views folder, create a fragment name `HelloDialog.fragment.xml` with following content. 

```xml
<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m">
    <Dialog id="helloDialog" title="Hello {/receipient/name}">
    </Dialog>
</core:FragmentDefinition>
```

Add a text for button in `i18n` file.

```txt
buttonTextWithDialog = Open with Dialog
```

In the HelloPanel view, add a button to trigger the dialog open. 

```xml 
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="ui5.walkthrough.controller.HelloPanel"
    displayBlock="true"
>
    <Panel
        headerText="{i18n>panelHeader}"
        class="sapUiResponsiveMargin"
        width="auto"
    >
        <Button
            text="{i18n>buttonTextWithDialog}"
            press="onPressWithDialog"
            class="sapUiSmallMarginEnd myCustomButton"
        />
        <Button
            text="{i18n>buttonText}"
            press="onPress"
            class="sapUiSmallMarginEnd myCustomButton"
        />
        <Input
            value="{/recipient/name}"
            valueLiveUpdate="true"
            width="60%"
        />
        <Text
            text="Hello {/recipient/name}"
            class="sapUiSmallMargin myCustomText sapThemeHighlight-asColor"
        />
    </Panel>
</mvc:View>
```

Add the event handler in the HelloPanel controller file. 

```ts
    onPressWithDialog() : void {
        
    }
```

Add the following logic to import the dialog and instantiate them. 

1. Import the dialog and Create a global private variable that takes a promise which returns a dialog. 

```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";

/**
 * @name ui5.walkthrough.controller.HelloPanel
 */
export default class HelloPanel extends Controller {

    private dialogPromise: Promise<Dialog>;

    onInit(): void {
        const data = {
            recipient: {
                name : "Ricky"
            }
        };
        const model = new JSONModel(data);
        this.getView()?.setModel(model);
    }


    onPress(): void {
        const recipient = (<JSONModel>this.getView()?.getModel())?.getProperty('/recipient/name');
        const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n")).getResourceBundle();
        const message = resourceBundle.getText("messageText", [recipient]) || "no text defined";
        MessageToast.show(message);              
    }

    onPressWithDialog() : void {
    
    }
  
}
```


2. Check for the dialog promise and load the dialog. 

```ts
    onPressWithDialog() : void {
        if(!this.dialogPromise) {
            this.dialogPromise = <Promise<Dialog>>this.loadFragment({
                name: "ui5.walkthrough.views.HelloDialog"
            });
        }
        this.dialogPromise.then((dialog) => {
            dialog.open();
        })
    }
```

Final code of hello panel controller. 

```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";

/**
 * @name ui5.walkthrough.controller.HelloPanel
 */
export default class HelloPanel extends Controller {

    private dialogPromise: Promise<Dialog>;

    onInit(): void {
        const data = {
            recipient: {
                name : "Ricky"
            }
        };
        const model = new JSONModel(data);
        this.getView()?.setModel(model);
    }


    onPress(): void {
        const recipient = (<JSONModel>this.getView()?.getModel())?.getProperty('/recipient/name');
        const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n")).getResourceBundle();
        const message = resourceBundle.getText("messageText", [recipient]) || "no text defined";
        MessageToast.show(message);              
    }

    onPressWithDialog() : void {
        if(!this.dialogPromise) {
            this.dialogPromise = <Promise<Dialog>>this.loadFragment({
                name: "ui5.walkthrough.views.HelloDialog"
            });
        }
        this.dialogPromise.then((dialog) => {
            dialog.open();
        })
    }
  
}
```


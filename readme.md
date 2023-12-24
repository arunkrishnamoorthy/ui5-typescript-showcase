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




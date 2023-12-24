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
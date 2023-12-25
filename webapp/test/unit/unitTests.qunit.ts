QUnit.config.autostart = false;

// Import all the test modules and start the testing. 

void Promise.all([
    import("ui5/walkthrough/test/unit/model/formatter")
]).then(() => {
    QUnit.start();
})

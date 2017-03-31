
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'jquery-3.1.1.min',
        fabric: 'helper/fabric.js/dist/fabric'
    }
});

require(['helper/util'], function (util) {
    
    util.setup(
        {
            addText: 'js-sidebar-add-text'
        }
    );
});
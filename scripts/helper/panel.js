define(['jquery'], function ($) {
    'use strict';

   $('#sidebar').w2sidebar({
        name       : 'sidebar',
        topHTML    : '<div style="background-color: #eee; padding: 10px 5px; border-bottom: 1px solid silver">Some HTML</div>',
        bottomHTML : '<div style="background-color: #eee; padding: 10px 5px; border-top: 1px solid silver">Some HTML</div>',
        nodes : [
            { id: 'level-1', text: 'Level 1', img: 'icon-folder', expanded: true, group: true,
              nodes: [ new w2form({ 
        name     : 'form',
        url      : 'server/post',
        header   : 'Field Types',
        formURL  : 'data/form.html', 
        fields: [
            { field: 'field_text', type: 'text', required: true },
            { field: 'field_alpha', type: 'alphaNumeric', required: true },
            { field: 'field_int', type: 'int', required: true },
            { field: 'field_float', type: 'float', required: true },
            { field: 'field_date', type: 'date' },
            { field: 'field_list', type: 'list', required: true, 
                options: { items: ['Adams, John', 'Johnson, Peter', 'Lewis, Frank', 'Cruz, Steve', 'Donnun, Nick'] } },
            { field: 'field_enum', type: 'enum', required: true, 
                options: { items: ['Adams, John', 'Johnson, Peter', 'Lewis, Frank', 'Cruz, Steve', 'Donnun, Nick'] } },
            { field: 'field_textarea', type: 'text'},
            { field: 'field_select', type: 'select', required: false, options: { items: ['fist', 'second'] } },
            { field: 'field_check', type: 'checkbox', required: false },
            { field: 'field_radio', type: 'radio', required: false }
        ],
        actions: {
            reset: function () {
                this.clear();
            },
            save: function () {
                var obj = this;
                this.save({}, function (data) { 
                    if (data.status == 'error') {
                        console.log('ERROR: '+ data.message);
                        return;
                    }
                    obj.clear();
                });
            }
        }
    }),
                       { id: 'level-1-2', text: 'Level 1.2', icon: 'fa-coffee' },
                       { id: 'level-1-3', text: 'Level 1.3', icon: 'fa-comment-alt' }
                     ]
            },
            { id: 'level-2', text: 'Level 2', img: 'icon-folder', group: true,
              nodes: [ { id: 'level-2-1', text: 'Level 2.1', icon: 'fa-star-empty' },
                       { id: 'level-2-2', text: 'Level 2.2', icon: 'fa-star-empty' },
                       { id: 'level-2-3', text: 'Level 2.3', icon: 'fa-star-empty' }
                     ]
            },
            { id: 'level-3', text: 'Level 3', img: 'icon-folder', group: true,
              nodes: [ { id: 'level-3-1', text: 'Level 3.1', icon: 'fa-star-empty' },
                       { id: 'level-3-2', text: 'Level 3.2', icon: 'fa-star-empty' },
                       { id: 'level-3-3', text: 'Level 3.3', icon: 'fa-star-empty' }
                     ]
            }
        ]
    }); 
    
});
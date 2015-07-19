(function() {
    'use strict';

    var REG_JAVASCRIPT_HREF = /^\s*javascript:/i;

    CKEDITOR.plugins.add('xss', {
        modes: { 'wysiwyg': 1 },

        afterInit: function(editor) {
            var rules = {
                'attributes': {
                    'href': function(value, element) {
                        if (REG_JAVASCRIPT_HREF.test(decodeURIComponent(value))) {
                            delete element.attributes.href;
                            delete element.attributes['data-cke-saved-href'];
                            return '';
                        }
                    }
                }
            };

            editor.dataProcessor.dataFilter.addRules(rules, { 'applyToAll': true, 'priority': 0 });
        }
    });
}());

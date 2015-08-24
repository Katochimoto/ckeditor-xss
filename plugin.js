(function() {
    'use strict';

    var REG_JAVASCRIPT_HREF = /^\s*javascript:|vbscript:|data:/i;
    var REG_REPLACE_ASCII = /[\x00-\x31\x127]/g;

    CKEDITOR.plugins.add('xss', {
        modes: { 'wysiwyg': 1 },

        afterInit: function(editor) {
            var rules = {
                'attributes': {
                    'href': function(value, element) {
                        if (REG_JAVASCRIPT_HREF.test(decodeURIComponent(value).replace(REG_REPLACE_ASCII, ''))) {
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

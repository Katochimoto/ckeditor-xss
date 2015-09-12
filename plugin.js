(function() {
    'use strict';

    var REG_JAVASCRIPT_HREF = /^\s*javascript:|vbscript:|data:/i;
    var REG_REPLACE_ASCII = /[\x00-\x31\x127]/g;
    var REG_URI_DECODE = /(%(?:D0|D1)%.{2})/g;

    CKEDITOR.plugins.add('xss', {
        modes: { 'wysiwyg': 1 },

        afterInit: function(editor) {
            var rules = {
                'attributes': {
                    'href': function(value, element) {
                        value = decode(value);
                        value = value.replace(REG_REPLACE_ASCII, '');

                        if (REG_JAVASCRIPT_HREF.test(value)) {
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

    function decode(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {
            return value.replace(REG_URI_DECODE, decodePart);
        }
    }

    function decodePart(part) {
        try {
            return decodeURIComponent(part);
        } catch (e) {
            return part;
        }
    }

}());

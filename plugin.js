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
        var out = '';

        try {
            out = decodeURIComponent(value);

        } catch (e) {
            var arr = value.split(/(%(?:D0|D1)%.{2})/);
            var i = 0;
            var l = arr.length;
            var x;

            for (; i < l; i++) {
                try {
                    x = decodeURIComponent(arr[ i ]);

                } catch (e) {
                    x = arr[ i ];
                }

                out += x;
            }
        }

        return out
    }
    
}());

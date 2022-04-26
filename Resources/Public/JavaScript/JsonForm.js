define(["require", "exports", "TYPO3/CMS/BwJsoneditor/jsoneditor", "jquery"], function (require, exports, JSONEditor, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonForm = (function () {
        function JsonForm(itemFormElName) {
            var element = $('.jsoneditor-form[data-input="' + itemFormElName + '"]').get(0);
            var options = JSON.parse(decodeURIComponent($(element).attr('data-options')));
            var hiddenInput = $('input[name="' + itemFormElName + '"]');
            var json = $(hiddenInput).val();
            if (!json)
                json = '{}';
            try {
                json = JSON.parse(json);
            }
            catch (e) {
            }
            options.onChangeText = function (json) {
                hiddenInput.val(json);
            };
            new JSONEditor(element, options, json);
        }
        return JsonForm;
    }());
    exports.JsonForm = JsonForm;
});

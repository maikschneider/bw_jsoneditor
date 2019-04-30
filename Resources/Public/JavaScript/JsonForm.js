define(["require", "exports", "TYPO3/CMS/BwJsoneditor/jsoneditor", "jquery"], function (require, exports, JSONEditor, $) {
    "use strict";
    var JsonForm = (function () {
        function JsonForm() {
        }
        JsonForm.prototype.init = function () {
            var elements = $(".jsoneditor-form");
            $.each(elements, function (i, element) {
                var options = JSON.parse(decodeURIComponent($(element).attr('data-options')));
                var hiddenInput = $('input[name="' + $(element).attr('data-input') + '"]');
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
            });
        };
        return JsonForm;
    }());
    return new JsonForm().init();
});

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
                options.onChangeJSON = function (json) {
                    hiddenInput.val(json);
                };
                console.log(options);
                var editor = new JSONEditor(element, options);
                editor.set(json);
            });
        };
        return JsonForm;
    }());
    return new JsonForm().init();
});

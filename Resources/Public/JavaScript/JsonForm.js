define(["require", "exports"], function (require, exports) {
    "use strict";
    var JsonForm = (function () {
        function JsonForm() {
        }
        JsonForm.prototype.initialize = function () {
            console.log('yes');
        };
        return JsonForm;
    }());
    return new JsonForm();
});

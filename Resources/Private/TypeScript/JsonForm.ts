/// <amd-dependency path='TYPO3/CMS/BwJsoneditor/jsoneditor' name='JSONEditor'>
import $ = require("jquery");


class JsonForm {
	public init() {

		const elements = $(".jsoneditor-form");

		$.each(elements, (i, element) => {

			const options = JSON.parse(decodeURIComponent($(element).attr('data-options')));

			const hiddenInput = $('input[name="' + $(element).attr('data-input') + '"]');
			let json = $(hiddenInput).val();
			if (!json) json = '{}';

			try {
				json = JSON.parse(json);
			} catch (e) {

			}

			options.onChangeText = function (json: any) {
				hiddenInput.val(json);
			};

			new JSONEditor(element, options, json);
		});

	}
}

export = new JsonForm().init()

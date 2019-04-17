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

			options.onChangeJSON = function(json: string){
				hiddenInput.val(json);
			};

			console.log(options);

			const editor = new JSONEditor(element, options);
			editor.set(json);
		});

	}
}

export = new JsonForm().init()

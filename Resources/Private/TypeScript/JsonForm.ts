/// <amd-dependency path='TYPO3/CMS/BwJsoneditor/jsoneditor' name='JSONEditor'>
import $ = require("jquery");

export class JsonForm {

  constructor(itemFormElName: string) {

    const element = $('.jsoneditor-form[data-input="' + itemFormElName + '"]').get(0);
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
  }

}

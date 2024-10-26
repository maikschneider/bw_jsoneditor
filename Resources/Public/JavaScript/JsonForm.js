import {createJSONEditor} from 'vanilla-jsoneditor/standalone.js'

export class JsonForm {

  constructor(itemFormElName) {

    console.log('JsonForm', itemFormElName);

    const element = document.querySelector('.jsoneditor-form[data-input="' + itemFormElName + '"]');
    const options = JSON.parse(decodeURIComponent(element.getAttribute('data-options')));
    const hiddenInput = document.querySelector('input[name="' + itemFormElName + '"]');

    let json = $(hiddenInput).val();
    if (!json) json = '{}';

    try {
      json = JSON.parse(json);
    } catch (e) {
    }

    options.onChangeText = function (json) {
      hiddenInput.val(json);
    };

    createJSONEditor({
      target: element,
      props: {
        json
      }
    })
  }

}

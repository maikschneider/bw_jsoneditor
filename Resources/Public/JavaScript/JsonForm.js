import {createJSONEditor} from './vanilla-jsoneditor/standalone.js'

export default class JsonForm {

  constructor(itemFormElName) {

    const element = document.querySelector('.jsoneditor-form[data-input="' + itemFormElName + '"]');
    const options = JSON.parse(decodeURIComponent(element.getAttribute('data-options')));
    const hiddenInput = document.querySelector('input[name="' + itemFormElName + '"]');

    let json = hiddenInput.value;
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

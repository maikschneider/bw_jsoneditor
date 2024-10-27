import {createJSONEditor} from './vanilla-jsoneditor/standalone.js'

export default class JsonEditor {

  constructor(fieldId, options) {

    const element = document.querySelector(`#${fieldId}`);
    const inputName = element.getAttribute('data-formengine-input-name');
    const hiddenInput = document.querySelector(`input[name="${inputName}"]`);

    console.log(fieldId, element)

    let content = {
      text: hiddenInput.value,
    }

    createJSONEditor({
      target: element,
      props: {
        content,
        mode: 'text',
        onChange: (updatedContent, previousContent, {contentErrors, patchResult}) => {
          // content is an object { json: unknown } | { text: string }
          console.log('onChange', {updatedContent, previousContent, contentErrors, patchResult})
          content = updatedContent
          hiddenInput.value = updatedContent.text
        }
      }
    })
  }

}

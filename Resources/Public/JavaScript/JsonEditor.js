import {createJSONEditor} from './vanilla-jsoneditor/standalone.js'

export default class JsonEditor {

  constructor(fieldId, options) {

    const element = document.querySelector(`#${fieldId}`);
    const inputName = element.getAttribute('data-formengine-input-name');
    const hiddenInput = document.querySelector(`input[name="${inputName}"]`);
    const formGroup = element.closest('.form-group')

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

          if (contentErrors) {
            formGroup.classList.add('has-error')
          } else {
            formGroup.classList.remove('has-error')
            hiddenInput.value = updatedContent.text
          }
        }
      }
    })
  }

}

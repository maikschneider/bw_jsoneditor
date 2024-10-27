import {createJSONEditor} from './vanilla-jsoneditor/standalone.js'

export default class JsonEditor {

  constructor(fieldId, options, typo3MajorVersion) {

    const element = document.querySelector(`#${fieldId}`);
    const inputName = element.getAttribute('data-formengine-input-name');
    const hiddenInput = document.querySelector(`input[name="${inputName}"]`);
    const formGroup = element.closest('.form-group')
    const initialValue = hiddenInput.value

    if (typo3MajorVersion > 12 && this.isDarkMode()) {
      element.classList.add('jse-theme-dark')
    }

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
            return
          }

          let newValue = updatedContent.text
          if (updatedContent.json) {
            newValue = JSON.stringify(updatedContent.json)
          }

          formGroup.classList.remove('has-error')
          hiddenInput.value = newValue

          if (initialValue !== newValue) {
            formGroup.classList.add('has-change')
          } else {
            formGroup.classList.remove('has-change')
          }
        }
      }
    })
  }

  isDarkMode() {
    if (document.querySelector('html').getAttribute('data-color-scheme') === 'dark') {
      return true
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

}

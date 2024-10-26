<?php

namespace Blueways\BwJsoneditor\Form\Element;

use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
use TYPO3\CMS\Core\Page\JavaScriptModuleInstruction;
use TYPO3\CMS\Core\Utility\ArrayUtility;

class JsonEditor extends AbstractFormElement
{
    protected array $defaultOptions = [
        'mode' => 'code',
        'modes' => ['code', 'tree', 'view', 'text'],
        'height' => '350px',
    ];

    public function render(): array
    {
        $resultArray = $this->initializeResultArray();

        $fieldConf = $this->data['parameterArray']['fieldConf']['config'];
        if (is_array($fieldConf) && isset($fieldConf['options']) && is_array($fieldConf['options'])) {
            ArrayUtility::mergeRecursiveWithOverrule($this->defaultOptions, $fieldConf['options']);
        }

        $parameterArray = $this->data['parameterArray'];

        $html = [];
        $html[] = '<div class="formengine-field-item t3js-formengine-field-item">';
        $html[] = '<div class="form-control-wrap">';
        $html[] = '<div style="height:' . $this->defaultOptions['height'] . '" data-input="' . $parameterArray['itemFormElName'] . '" class="jsoneditor-form" data-options="' . urlencode(json_encode($this->defaultOptions)) . '">';
        $html[] = '</div>';
        $html[] = '</div>';
        $html[] = '</div>';
        $html[] = '<input type="hidden" name="' . $parameterArray['itemFormElName'] . '" value="' . htmlspecialchars($parameterArray['itemFormElValue']) . '" />';

        $resultArray['javaScriptModules'][] = JavaScriptModuleInstruction::create(
            '@blueways/bw-jsoneditor/JsonForm.js'
        )->instance($parameterArray['itemFormElName']);

        $resultArray['html'] = implode(LF, $html);

        return $resultArray;
    }
}

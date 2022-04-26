<?php

namespace Blueways\BwJsoneditor\Form\Element;

use TYPO3\CMS\Core\Utility\ArrayUtility;

class JsonEditor extends \TYPO3\CMS\Backend\Form\Element\AbstractFormElement
{

    protected $defaultOptions = [
        'mode' => 'code',
        'modes' => ['code', 'tree', 'view', 'text'],
        'height' => '350px'
    ];

    public function render()
    {
        $resultArray = $this->initializeResultArray();
        $resultArray['stylesheetFiles'] = ['EXT:bw_jsoneditor/Resources/Public/Css/jsoneditor.css'];

        $fieldWizardResult = $this->renderFieldWizard();
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldWizardResult, false);

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

        $resultArray['html'] = implode(LF, $html);
        $resultArray['requireJsModules'][] = [
            'TYPO3/CMS/BwJsoneditor/JsonForm' => 'function(jsonForms){ new jsonForms.JsonForm(\'' . $parameterArray['itemFormElName'] . '\');}'
        ];

        return $resultArray;
    }

}

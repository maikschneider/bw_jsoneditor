<?php

namespace Blueways\BwJsoneditor\Form\Element;

use TYPO3\CMS\Core\Utility\ArrayUtility;

class JsonEditor extends \TYPO3\CMS\Backend\Form\Element\AbstractFormElement
{

    protected $defaultOptions = [
        'mode' => 'code'
    ];

    public function render()
    {
        $resultArray = $this->initializeResultArray();
        $resultArray['stylesheetFiles'] = ['EXT:bw_jsoneditor/Resources/Public/Css/jsoneditor.css'];
        $resultArray['requireJsModules'] = [
            'TYPO3/CMS/BwJsoneditor/JsonForm'
        ];

        $fieldWizardResult = $this->renderFieldWizard();
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldWizardResult, false);

        $fieldConf = $this->data['parameterArray']['fieldConf']['config'];

        if (is_array($fieldConf) && is_array($fieldConf['options'])) {
            ArrayUtility::mergeRecursiveWithOverrule($this->defaultOptions, $fieldConf['options']);
        }

        $parameterArray = $this->data['parameterArray'];

        \TYPO3\CMS\Core\Utility\DebugUtility::debug($this->data, 'Debug: ' . __FILE__ . ' in Line: ' . __LINE__);

        $fieldName = $this->data['fieldName'];
        $json = $this->data['databaseRow'][$fieldName];

        //\TYPO3\CMS\Core\Utility\DebugUtility::debug($this->data, 'Debug: ' . __FILE__ . ' in Line: ' . __LINE__);

        $html = [];
        $html[] = '<div class="formengine-field-item t3js-formengine-field-item">';
        $html[] = '<div class="form-control-wrap">';
        $html[] = '<div data-input="' . $parameterArray['itemFormElName'] . '" class="jsoneditor-form" data-options="' . urlencode(json_encode($this->defaultOptions)) . '">';
        $html[] = '</div>';
        $html[] = '</div>';
        $html[] = '</div>';

        $resultArray['additionalHiddenFields'][] = '<input type="hidden" name="' . $parameterArray['itemFormElName'] . '" value="www' . htmlspecialchars($parameterArray['itemFormElValue']) . '" />';

        $resultArray['html'] = implode(LF, $html);

        return $resultArray;
    }

}

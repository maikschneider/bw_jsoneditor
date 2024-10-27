<?php

namespace Blueways\BwJsoneditor\Form\Element;

use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
use TYPO3\CMS\Core\Information\Typo3Version;
use TYPO3\CMS\Core\Page\JavaScriptModuleInstruction;
use TYPO3\CMS\Core\Utility\ArrayUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\StringUtility;

class JsonEditor extends AbstractFormElement
{
    protected const DEFAULT_OPTIONS = [
        'mode' => 'text',
        'modes' => ['text', 'tree', 'table'],
        'height' => 'auto',
    ];

    protected $defaultFieldInformation = [
        'tcaDescription' => [
            'renderType' => 'tcaDescription',
        ],
    ];

    public function render(): array
    {
        $parameterArray = $this->data['parameterArray'];
        $fieldInformationResult = $this->renderFieldInformation();
        $fieldInformationHtml = $fieldInformationResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($this->initializeResultArray(), $fieldInformationResult, false);

        $versionInformation = GeneralUtility::makeInstance(Typo3Version::class);
        $typo3MajorVersion = $versionInformation->getMajorVersion();

        // add stylesheets
        if ($typo3MajorVersion > 12) {
            $resultArray['stylesheetFiles'][] = 'EXT:bw_jsoneditor/Resources/Public/JavaScript/vanilla-jsoneditor/themes/jse-theme-dark.css';
        }
        $resultArray['stylesheetFiles'][] = 'EXT:bw_jsoneditor/Resources/Public/Css/typo3-theme.css';

        // editor options
        $options = self::DEFAULT_OPTIONS;
        ArrayUtility::mergeRecursiveWithOverrule($options, $parameterArray['fieldConf']['config']['options'] ?? []);

        $fieldId = StringUtility::getUniqueId('formengine-input-');
        $itemName = (string)$parameterArray['itemFormElName'];
        $itemValue = $parameterArray['itemFormElValue'];

        $resultArray['javaScriptModules'][] = JavaScriptModuleInstruction::create(
            '@blueways/bw-jsoneditor/JsonEditor.js'
        )->instance($fieldId, $options, $typo3MajorVersion);

        $html = [];
        if ($typo3MajorVersion > 12) {
            $html[] = $this->renderLabel($fieldId);
        }
        $html[] = '<div class="formengine-field-item">';
        $html[] = $fieldInformationHtml;
        $html[] = '<div class="form-control-wrap">';
        $html[] = '<div style="height:' . $options['height'] . '" id="' . htmlspecialchars($fieldId) . '" data-formengine-input-name="' . htmlspecialchars($itemName) . '">';
        $html[] = '</div>';
        $html[] = '</div>';
        $html[] = '</div>';
        $html[] = '<input type="hidden" name="' . htmlspecialchars($itemName) . '" value="' . htmlspecialchars((string)$itemValue) . '" />';

        $resultArray['html'] = implode(LF, $html);

        return $resultArray;
    }
}

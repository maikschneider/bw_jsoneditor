<?php

namespace Blueways\BwJsoneditor\Form\Element;

class JsonEditor extends \TYPO3\CMS\Backend\Form\Element\AbstractFormElement
{

    public function render()
    {
        $resultArray = $this->initializeResultArray();

        $resultArray['requireJsModules'][] = [
            'TYPO3/CMS/BwJsoneditor/JsonForm' => 'function(JsonForm){top.require([], function() {}); }',
        ];

        $resultArray['html'] = '<textarea>Hello!</textarea>';


        return $resultArray;
    }

}

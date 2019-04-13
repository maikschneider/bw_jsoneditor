<?php
defined('TYPO3_MODE') || die('Access denied.');

call_user_func(function() {

    $GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1533721570] = [
        'nodeName' => 'jsonForm',
        'priority' => '70',
        'class' => \Blueways\BwJsoneditor\Form\Element\JsonEditor::class
    ];

});

<?php

call_user_func(function () {
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1555446505] = [
        'nodeName' => 'jsonForm',
        'priority' => '70',
        'class' => \Blueways\BwJsoneditor\Form\Element\JsonEditor::class,
    ];
});

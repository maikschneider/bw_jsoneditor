<?php

use Blueways\BwJsoneditor\Form\Element\JsonEditor;

call_user_func(static function () {
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1555446505] = [
        'nodeName' => 'jsonEditor',
        'priority' => '70',
        'class' => JsonEditor::class,
    ];
});

<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'JSON form Editor',
    'description' => 'JSON editor for TYPO3 backend',
    'category' => 'plugin',
    'author' => 'Maik Schneider',
    'author_email' => 'm.schneider@blueways.de',
    'state' => 'beta',
    'internal' => '',
    'uploadfolder' => '0',
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '1.0.0',
    'constraints' => [
        'depends' => [
            'typo3' => '8.7.20-9.9.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];

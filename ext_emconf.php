<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'JSON Editor',
    'description' => 'JSON form editor for the TYPO3 backend. View and edit JSON data with code formatting and syntax highlighting.',
    'category' => 'be',
    'author' => 'Maik Schneider',
    'author_email' => 'm.schneider@blueways.de',
    'state' => 'stable',
    'internal' => '',
    'uploadfolder' => '0',
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '1.0.4',
    'constraints' => [
        'depends' => [
            'typo3' => '8.7.20-11.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];

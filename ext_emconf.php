<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'JSON Editor',
    'description' => 'JSON form editor for the TYPO3 backend. View and edit JSON data with code formatting and syntax highlighting.',
    'category' => 'be',
    'author' => 'Maik Schneider',
    'author_email' => 'maik.schneider@xima.de',
    'author_company' => 'XIMA Media GmbH',
    'state' => 'stable',
    'version' => '1.1.0',
    'constraints' => [
        'depends' => [
            'typo3' => '8.7.20-12.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];

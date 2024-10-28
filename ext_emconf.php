<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'JSON Editor',
    'description' => 'Adds a JSON Form Editor type to the TYPO3 Backend. Edit JSON data with code formatting, syntax highlighting, auto repair and more.',
    'category' => 'be',
    'author' => 'Maik Schneider',
    'author_email' => 'maik.schneider@xima.de',
    'author_company' => 'XIMA Media GmbH',
    'state' => 'stable',
    'version' => '2.0.0',
    'constraints' => [
        'depends' => [
            'typo3' => '12.4.0-13.4.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];

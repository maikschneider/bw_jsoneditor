<?php

declare(strict_types=1);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', [
    'json' => [
        'label' => 'Example JSON',
        'description' => 'This editor has some nice features like syntax highlighting, validation and more.',
        'config' => [
            'type' => 'user',
            'renderType' => 'jsonEditor',
        ],
    ],
]);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'tt_content',
    'json',
    'textmedia',
    'after:bodytext'
);

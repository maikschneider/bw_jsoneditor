# TYPO3 JSON Form Editor

Integrates the [JSON Editor](https://github.com/josdejong/jsoneditor) into the TYPO3 Backend. 

The extension adds a new [renderType](https://docs.typo3.org/typo3cms/TCAReference/ColumnsConfig/Type/Text.html#properties-rendertype-default) "**jsonForm**" for TCA text columns.
# Install

```
composer require blueways/bw-jsoneditor
``` 

# Usage

 You can set or override any TCA column:
 
```
$GLOBALS['TCA']['tt_content']['columns']['header']['config']['renderType'] = 'jsonForm';
```

Make sure the database column of your field is large enough if you want to use an existing varchar(255) field, e.g. set to type "text".

# Configuration

You can configure the JSON Editor with the [offical API](https://github.com/josdejong/jsoneditor/blob/master/docs/api.md) by adding the settings to the options array:

```
$GLOBALS['TCA']['tt_content']['columns']['header']['config']['options'] = [
    'mode' => 'tree'
];
```

The new option "height" controls the height of the editor when initialized. 

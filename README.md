# TYPO3 JSON Form Editor

Integrates the [JSON Editor](https://github.com/josdejong/jsoneditor) into the TYPO3 Backend.

The extension adds a new [renderType](https://docs.typo3.org/m/typo3/reference-tca/master/en-us/ColumnsConfig/Type/Text/Index.html) "**jsonForm**" for TCA text columns.

![Screenshot](Documentation/Images/Screenshot.png)

# Install

```
composer require blueways/bw-jsoneditor
```

# Usage

 You can set or override any TCA column:

```
$GLOBALS['TCA']['tt_content']['columns']['bodytext']['config']['renderType'] = 'jsonForm';
```

Make sure the database column of your field is large enough if you want to use an existing varchar(255) field, e.g. set to type "text".

# Configuration

You can configure the JSON Editor with the [offical API](https://github.com/josdejong/jsoneditor/blob/master/docs/api.md) by adding the settings to the options array:

```
$GLOBALS['TCA']['tt_content']['columns']['bodytext']['config']['options'] = [
    'mode' => 'tree'
];
```

The new option "height" controls the height of the editor when initialized.

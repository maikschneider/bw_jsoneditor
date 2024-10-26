import { SvelteComponent, SvelteComponentTyped } from 'svelte';
import { JSONPath, JSONPatchDocument } from 'immutable-json-patch';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Action } from 'svelte/action';
import Ajv, { Options } from 'ajv';

type TextContent = {
    text: string;
};
type JSONContent = {
    json: unknown;
};
type Content = JSONContent | TextContent;
interface JSONParser {
    parse(text: string, reviver?: ((this: unknown, key: string, value: unknown) => unknown) | null): unknown;
    stringify(value: unknown, replacer?: ((this: unknown, key: string, value: unknown) => unknown) | Array<number | string> | null, space?: string | number): string | undefined;
}
interface JSONPathParser {
    parse: (pathStr: string) => JSONPath;
    stringify: (path: JSONPath) => string;
}
interface VisibleSection {
    start: number;
    end: number;
}
declare enum Mode {
    text = "text",
    tree = "tree",
    table = "table"
}
declare enum SelectionType {
    after = "after",
    inside = "inside",
    key = "key",
    value = "value",
    multi = "multi",
    text = "text"
}
declare enum CaretType {
    after = "after",
    key = "key",
    value = "value",
    inside = "inside"
}
interface PathOption {
    value: JSONPath;
    label: string;
}
interface NumberOption {
    value: 1 | -1;
    label: string;
}
interface CaretPosition {
    path: JSONPath;
    type: CaretType;
}
interface ObjectRecursiveState {
    type: 'object';
    properties: Record<string, RecursiveState | undefined>;
}
interface ArrayRecursiveState {
    type: 'array';
    items: Array<RecursiveState | undefined>;
}
interface ValueRecursiveState {
    type: 'value';
}
type RecursiveState = ObjectRecursiveState | ArrayRecursiveState | ValueRecursiveState;
interface RecursiveStateFactory {
    createObjectDocumentState: () => ObjectRecursiveState;
    createArrayDocumentState: () => ArrayRecursiveState;
    createValueDocumentState: () => ValueRecursiveState;
}
interface ObjectDocumentState extends ObjectRecursiveState {
    type: 'object';
    properties: Record<string, DocumentState | undefined>;
    expanded: boolean;
}
interface ArrayDocumentState extends ArrayRecursiveState {
    type: 'array';
    items: Array<DocumentState | undefined>;
    expanded: boolean;
    visibleSections: VisibleSection[];
}
interface ValueDocumentState extends ValueRecursiveState {
    type: 'value';
    enforceString?: boolean;
}
type DocumentState = ObjectDocumentState | ArrayDocumentState | ValueDocumentState;
interface ObjectSearchResults extends ObjectRecursiveState {
    type: 'object';
    properties: Record<string, SearchResults | undefined>;
    searchResults?: ExtendedSearchResultItem[];
}
interface ArraySearchResults extends ArrayRecursiveState {
    type: 'array';
    items: Array<SearchResults | undefined>;
    searchResults?: ExtendedSearchResultItem[];
}
interface ValueSearchResults extends ValueRecursiveState {
    type: 'value';
    searchResults?: ExtendedSearchResultItem[];
}
type SearchResults = ObjectSearchResults | ArraySearchResults | ValueSearchResults;
type WithSearchResults = SearchResults & {
    searchResults: ExtendedSearchResultItem[];
};
interface ObjectValidationErrors extends ObjectRecursiveState {
    type: 'object';
    properties: Record<string, ValidationErrors | undefined>;
    validationError?: NestedValidationError;
}
interface ArrayValidationErrors extends ArrayRecursiveState {
    type: 'array';
    items: Array<ValidationErrors | undefined>;
    validationError?: NestedValidationError;
}
interface ValueValidationErrors extends ValueRecursiveState {
    type: 'value';
    validationError?: NestedValidationError;
}
type ValidationErrors = ObjectValidationErrors | ArrayValidationErrors | ValueValidationErrors;
interface JSONPatchResult {
    json: unknown;
    previousJson: unknown;
    undo: JSONPatchDocument;
    redo: JSONPatchDocument;
}
type AfterPatchCallback = (patchedJson: unknown, patchedState: DocumentState | undefined, patchedSelection: JSONSelection | undefined) => {
    json?: unknown;
    state?: DocumentState | undefined;
    selection?: JSONSelection | undefined;
    sortedColumn?: SortedColumn | undefined;
} | undefined;
interface MultiSelection {
    type: SelectionType.multi;
    anchorPath: JSONPath;
    focusPath: JSONPath;
}
interface AfterSelection {
    type: SelectionType.after;
    path: JSONPath;
}
interface InsideSelection {
    type: SelectionType.inside;
    path: JSONPath;
}
interface KeySelection {
    type: SelectionType.key;
    path: JSONPath;
}
interface EditKeySelection extends KeySelection {
    type: SelectionType.key;
    path: JSONPath;
    edit: true;
    initialValue?: string;
}
type ValueSelection = {
    type: SelectionType.value;
    path: JSONPath;
};
interface EditValueSelection extends ValueSelection {
    type: SelectionType.value;
    path: JSONPath;
    edit: true;
    initialValue?: string;
}
type JSONSelection = MultiSelection | AfterSelection | InsideSelection | KeySelection | EditKeySelection | ValueSelection | EditValueSelection;
interface TextSelection {
    type: SelectionType.text;
    ranges: {
        anchor: number;
        head: number;
    }[];
    main: number;
}
type JSONEditorSelection = JSONSelection | TextSelection;
type ClipboardValues = Array<{
    key: string;
    value: unknown;
}>;
interface MenuButton {
    type: 'button';
    onClick: (event: MouseEvent) => void;
    icon?: IconDefinition;
    text?: string;
    title?: string;
    className?: string;
    disabled?: boolean;
}
interface MenuDropDownButton {
    type: 'dropdown-button';
    main: MenuButton;
    width?: string;
    items: MenuButton[];
}
interface MenuLabel {
    type: 'label';
    text: string;
}
interface MenuSeparator {
    type: 'separator';
}
interface MenuSpace {
    type: 'space';
}
type MenuItem = MenuButton | MenuSeparator | MenuSpace;
interface ContextMenuColumn {
    type: 'column';
    items: Array<MenuButton | MenuDropDownButton | MenuLabel | MenuSeparator>;
}
interface ContextMenuRow {
    type: 'row';
    items: Array<MenuButton | MenuDropDownButton | ContextMenuColumn>;
}
type ContextMenuItem = MenuButton | MenuDropDownButton | MenuSeparator | ContextMenuRow;
interface MessageAction {
    text: string;
    title: string;
    icon?: IconDefinition;
    onClick?: () => void;
    onMouseDown?: () => void;
    disabled?: boolean;
}
declare enum ValidationSeverity {
    info = "info",
    warning = "warning",
    error = "error"
}
interface ValidationError {
    path: JSONPath;
    message: string;
    severity: ValidationSeverity;
}
interface NestedValidationError extends ValidationError {
    isChildError?: boolean;
}
type Validator = (json: unknown) => ValidationError[];
interface ParseError {
    position: number | undefined;
    line: number | undefined;
    column: number | undefined;
    message: string;
}
interface ContentParseError {
    parseError: ParseError;
    isRepairable: boolean;
}
interface ContentValidationErrors {
    validationErrors: ValidationError[];
}
type ContentErrors = ContentParseError | ContentValidationErrors;
interface RichValidationError extends ValidationError {
    line: number | undefined;
    column: number | undefined;
    from: number | undefined;
    to: number | undefined;
    actions: Array<{
        name: string;
        apply: () => void;
    }> | undefined;
}
interface TextLocation {
    path: JSONPath;
    line: number;
    column: number;
    from: number;
    to: number;
}
interface Section {
    start: number;
    end: number;
}
interface QueryLanguage {
    id: string;
    name: string;
    description: string;
    createQuery: (json: unknown, queryOptions: QueryLanguageOptions) => string;
    executeQuery: (json: unknown, query: string, parser: JSONParser) => unknown;
}
interface QueryLanguageOptions {
    filter?: {
        path?: JSONPath;
        relation?: '==' | '!=' | '<' | '<=' | '>' | '>=';
        value?: string;
    };
    sort?: {
        path?: JSONPath;
        direction?: 'asc' | 'desc';
    };
    projection?: {
        paths?: JSONPath[];
    };
}
type OnChangeQueryLanguage = (queryLanguageId: string) => void;
interface OnChangeStatus {
    contentErrors: ContentErrors | undefined;
    patchResult: JSONPatchResult | undefined;
}
type OnChange = ((content: Content, previousContent: Content, status: OnChangeStatus) => void) | undefined;
type OnJSONSelect = (selection: JSONSelection) => void;
type OnSelect = (selection: JSONEditorSelection | undefined) => void;
type OnPatch = (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
type OnChangeText = (updatedText: string, afterPatch?: AfterPatchCallback) => void;
type OnSort = (params: {
    operations: JSONPatchDocument;
    rootPath: JSONPath;
    itemPath: JSONPath;
    direction: 1 | -1;
}) => void;
type OnFind = (findAndReplace: boolean) => void;
type OnPaste = (pastedText: string) => void;
type OnPasteJson = (pastedJson: PastedJson) => void;
type OnExpand = (relativePath: JSONPath) => boolean;
type OnRenderValue = (props: RenderValueProps) => RenderValueComponentDescription[];
type OnClassName = (path: JSONPath, value: unknown) => string | undefined;
type OnChangeMode = (mode: Mode) => void;
type OnContextMenu = (contextMenuProps: AbsolutePopupOptions) => void;
type RenderMenuContext = {
    mode: Mode;
    modal: boolean;
    readOnly: boolean;
};
type OnRenderMenu = (items: MenuItem[], context: RenderMenuContext) => MenuItem[] | undefined;
type OnRenderMenuInternal = (items: MenuItem[]) => MenuItem[] | undefined;
type RenderContextMenuContext = RenderMenuContext & {
    selection: JSONEditorSelection | undefined;
};
type OnRenderContextMenu = (items: ContextMenuItem[], context: RenderContextMenuContext) => ContextMenuItem[] | false | undefined;
type OnRenderContextMenuInternal = (items: ContextMenuItem[]) => ContextMenuItem[] | false | undefined;
type OnError = (error: Error) => void;
type OnFocus = () => void;
type OnBlur = () => void;
type OnSortModal = (props: SortModalCallback) => void;
type OnTransformModal = (props: TransformModalCallback) => void;
type OnJSONEditorModal = (props: JSONEditorModalCallback) => void;
type FindNextInside = (path: JSONPath) => JSONSelection | undefined;
interface SearchResultDetails {
    items: ExtendedSearchResultItem[];
    activeItem: ExtendedSearchResultItem | undefined;
    activeIndex: number | -1;
}
declare enum SearchField {
    key = "key",
    value = "value"
}
interface SearchOptions {
    maxResults?: number;
    columns?: JSONPath[];
}
interface SearchResultItem {
    path: JSONPath;
    field: SearchField;
    fieldIndex: number;
    start: number;
    end: number;
}
interface ExtendedSearchResultItem extends SearchResultItem {
    active: boolean;
}
type EscapeValue = (value: unknown) => string;
type UnescapeValue = (escapedValue: string) => string;
interface ValueNormalization {
    escapeValue: EscapeValue;
    unescapeValue: UnescapeValue;
}
type PastedJson = {
    path: JSONPath;
    contents: unknown;
    onPasteAsJson: () => void;
};
interface DragInsideProps {
    json: unknown;
    selection: JSONSelection;
    deltaY: number;
    items: Array<{
        path: JSONPath;
        height: number;
    }>;
}
type DragInsideAction = {
    beforePath: JSONPath;
    offset: number;
} | {
    append: true;
    offset: number;
};
interface RenderedItem {
    path: JSONPath;
    height: number;
}
interface HistoryItem {
    undo: {
        patch: JSONPatchDocument | undefined;
        json: unknown | undefined;
        text: string | undefined;
        documentState: DocumentState | undefined;
        selection: JSONSelection | undefined;
        sortedColumn: SortedColumn | undefined;
        textIsRepaired: boolean;
    };
    redo: {
        patch: JSONPatchDocument | undefined;
        json: unknown | undefined;
        text: string | undefined;
        documentState: DocumentState | undefined;
        selection: JSONSelection | undefined;
        sortedColumn: SortedColumn | undefined;
        textIsRepaired: boolean;
    };
}
type ConvertType = 'value' | 'object' | 'array';
type InsertType = ConvertType | 'structure';
interface PopupEntry {
    id: number;
    component: typeof SvelteComponent<Record<string, unknown>>;
    props: Record<string, unknown>;
    options: AbsolutePopupOptions;
}
interface AbsolutePopupOptions {
    anchor?: Element;
    position?: 'top' | 'left';
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    offsetTop?: number;
    offsetLeft?: number;
    showTip?: boolean;
    closeOnOuterClick?: boolean;
    onClose?: () => void;
}
interface AbsolutePopupContext {
    openAbsolutePopup: (component: typeof SvelteComponent<Record<string, unknown>>, props: Record<string, unknown>, options: AbsolutePopupOptions) => number;
    closeAbsolutePopup: (popupId: number | undefined) => void;
}
interface JSONEditorPropsOptional {
    content?: Content;
    readOnly?: boolean;
    indentation?: number | string;
    tabSize?: number;
    mode?: Mode;
    mainMenuBar?: boolean;
    navigationBar?: boolean;
    statusBar?: boolean;
    askToFormat?: boolean;
    escapeControlCharacters?: boolean;
    escapeUnicodeCharacters?: boolean;
    flattenColumns?: boolean;
    parser?: JSONParser;
    validator?: Validator | undefined;
    validationParser?: JSONParser;
    pathParser?: JSONPathParser;
    queryLanguages?: QueryLanguage[];
    queryLanguageId?: string;
    onChangeQueryLanguage?: OnChangeQueryLanguage;
    onChange?: OnChange;
    onRenderValue?: OnRenderValue;
    onClassName?: OnClassName;
    onRenderMenu?: OnRenderMenu;
    onRenderContextMenu?: OnRenderContextMenu;
    onChangeMode?: OnChangeMode;
    onSelect?: OnSelect;
    onError?: OnError;
    onFocus?: OnFocus;
    onBlur?: OnBlur;
}
interface JSONEditorModalProps {
    content: Content;
    path: JSONPath;
    onPatch: OnPatch;
    readOnly: boolean;
    indentation: number | string;
    tabSize: number;
    mainMenuBar: boolean;
    navigationBar: boolean;
    statusBar: boolean;
    askToFormat: boolean;
    escapeControlCharacters: boolean;
    escapeUnicodeCharacters: boolean;
    flattenColumns: boolean;
    parser: JSONParser;
    validator: Validator | undefined;
    validationParser: JSONParser;
    pathParser: JSONPathParser;
    onRenderValue: OnRenderValue;
    onClassName: OnClassName;
    onRenderMenu: OnRenderMenu;
    onRenderContextMenu: OnRenderContextMenu;
    onSortModal: (props: SortModalCallback) => void;
    onTransformModal: (props: TransformModalCallback) => void;
    onClose: () => void;
}
interface JSONEditorContext {
    mode: Mode;
    readOnly: boolean;
    parser: JSONParser;
    normalization: ValueNormalization;
    getJson: () => unknown | undefined;
    getDocumentState: () => DocumentState | undefined;
    findElement: (path: JSONPath) => Element | undefined;
    findNextInside: FindNextInside;
    focus: () => void;
    onPatch: OnPatch;
    onSelect: OnJSONSelect;
    onFind: OnFind;
    onPasteJson: (newPastedJson: PastedJson) => void;
    onRenderValue: OnRenderValue;
}
interface TreeModeContext extends JSONEditorContext {
    getJson: () => unknown | undefined;
    getDocumentState: () => DocumentState | undefined;
    getSelection: () => JSONSelection | undefined;
    findElement: (path: JSONPath) => Element | undefined;
    onInsert: (type: InsertType) => void;
    onExpand: (path: JSONPath, expanded: boolean, recursive?: boolean) => void;
    onExpandSection: (path: JSONPath, section: Section) => void;
    onContextMenu: OnContextMenu;
    onClassName: OnClassName;
    onDrag: (event: MouseEvent) => void;
    onDragEnd: () => void;
}
interface RenderValueProps {
    path: JSONPath;
    value: unknown;
    mode: Mode;
    readOnly: boolean;
    enforceString: boolean;
    selection: JSONSelection | undefined;
    searchResultItems: SearchResultItem[] | undefined;
    isEditing: boolean;
    parser: JSONParser;
    normalization: ValueNormalization;
    onPatch: OnPatch;
    onPasteJson: OnPasteJson;
    onSelect: OnJSONSelect;
    onFind: OnFind;
    findNextInside: FindNextInside;
    focus: () => void;
}
type RenderValuePropsOptional = Partial<RenderValueProps>;
interface DraggingState {
    initialTarget: Element;
    initialClientY: number;
    initialContentTop: number;
    selectionStartIndex: number;
    selectionItemsCount: number;
    items: RenderedItem[];
    offset: number;
    didMoveItems: boolean;
}
type RenderValueComponentDescription = SvelteComponentRenderer | SvelteActionRenderer;
interface SvelteComponentRenderer {
    component: typeof SvelteComponent<RenderValuePropsOptional>;
    props: Record<string, unknown>;
}
interface SvelteActionRenderer {
    action: Action<HTMLElement, Record<string, unknown>>;
    props: Record<string, unknown>;
}
interface TransformModalOptions {
    id?: string;
    rootPath?: JSONPath;
    onTransform?: (state: {
        operations: JSONPatchDocument;
        json: unknown;
        transformedJson: unknown;
    }) => void;
    onClose?: () => void;
}
interface TransformModalCallback {
    id: string;
    json: unknown;
    rootPath: JSONPath;
    onTransform: (operations: JSONPatchDocument) => void;
    onClose: () => void;
}
interface TransformModalProps extends TransformModalCallback {
    id: string;
    json: unknown;
    rootPath: JSONPath;
    indentation: number | string;
    escapeControlCharacters: boolean;
    escapeUnicodeCharacters: boolean;
    parser: JSONParser;
    parseMemoizeOne: JSONParser['parse'];
    validationParser: JSONParser;
    pathParser: JSONPathParser;
    queryLanguages: QueryLanguage[];
    queryLanguageId: string;
    onChangeQueryLanguage: OnChangeQueryLanguage;
    onRenderValue: OnRenderValue;
    onRenderMenu: OnRenderMenuInternal;
    onRenderContextMenu: OnRenderContextMenuInternal;
    onClassName: OnClassName;
    onTransform: (operations: JSONPatchDocument) => void;
    onClose: () => void;
}
interface SortModalCallback {
    id: string;
    json: unknown;
    rootPath: JSONPath;
    onSort: OnSort;
    onClose: () => void;
}
interface JSONRepairModalProps {
    text: string;
    onParse: (text: string) => void;
    onRepair: (text: string) => string;
    onApply: (repairedText: string) => void;
    onClose: () => void;
}
interface JSONEditorModalCallback {
    content: Content;
    path: JSONPath;
    onPatch: OnPatch;
    onClose: () => void;
}
declare enum SortDirection {
    asc = "asc",
    desc = "desc"
}
declare enum UpdateSelectionAfterChange {
    no = "no",
    self = "self",
    nextInside = "nextInside"
}
interface TableCellIndex {
    rowIndex: number;
    columnIndex: number;
}
interface SortedColumn {
    path: JSONPath;
    sortDirection: SortDirection;
}
type JSONSchema = Record<string, unknown>;
type JSONSchemaDefinitions = Record<string, JSONSchema>;
type JSONSchemaEnum = Array<unknown>;

declare const __propDef$6: {
    props: {
        content?: Content;
        selection?: JSONEditorSelection | undefined;
        readOnly?: boolean;
        indentation?: number | string;
        tabSize?: number;
        mode?: Mode;
        mainMenuBar?: boolean;
        navigationBar?: boolean;
        statusBar?: boolean;
        askToFormat?: boolean;
        escapeControlCharacters?: boolean;
        escapeUnicodeCharacters?: boolean;
        flattenColumns?: boolean;
        parser?: JSONParser;
        validator?: Validator | undefined;
        validationParser?: JSONParser;
        pathParser?: JSONPathParser;
        queryLanguages?: QueryLanguage[];
        queryLanguageId?: string;
        onChangeQueryLanguage?: OnChangeQueryLanguage;
        onChange?: OnChange | undefined;
        onSelect?: OnSelect | undefined;
        onRenderValue?: OnRenderValue;
        onClassName?: OnClassName;
        onRenderMenu?: OnRenderMenu;
        onRenderContextMenu?: OnRenderContextMenu;
        onChangeMode?: OnChangeMode;
        onError?: OnError;
        onFocus?: OnFocus;
        onBlur?: OnBlur;
        get?: () => Content;
        set?: (newContent: Content) => Promise<void>;
        update?: (updatedContent: Content) => Promise<void>;
        patch?: (operations: JSONPatchDocument) => Promise<JSONPatchResult>;
        select?: (newSelection: JSONEditorSelection | undefined) => Promise<void>;
        expand?: (path: JSONPath, callback?: OnExpand) => Promise<void>;
        collapse?: (path: JSONPath, recursive?: boolean) => Promise<void>;
        transform?: (options: TransformModalOptions) => void;
        validate?: () => ContentErrors | undefined;
        acceptAutoRepair?: () => Promise<Content>;
        scrollTo?: (path: JSONPath) => Promise<void>;
        findElement?: (path: JSONPath) => Element | undefined;
        focus?: () => Promise<void>;
        refresh?: () => Promise<void>;
        updateProps?: (props: JSONEditorPropsOptional) => Promise<void>;
        destroy?: () => Promise<void>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type JsonEditorProps = typeof __propDef$6.props;
type JsonEditorEvents = typeof __propDef$6.events;
type JsonEditorSlots = typeof __propDef$6.slots;
declare class JsonEditor extends SvelteComponentTyped<JsonEditorProps, JsonEditorEvents, JsonEditorSlots> {
    get get(): () => Content;
    get set(): (newContent: Content) => Promise<void>;
    get update(): (updatedContent: Content) => Promise<void>;
    get patch(): (operations: JSONPatchDocument) => Promise<JSONPatchResult>;
    get select(): (newSelection: JSONEditorSelection | undefined) => Promise<void>;
    get expand(): (path: JSONPath, callback?: OnExpand) => Promise<void>;
    get collapse(): (path: JSONPath, recursive?: boolean) => Promise<void>;
    get transform(): (options: TransformModalOptions) => void;
    get validate(): () => ContentErrors | undefined;
    get acceptAutoRepair(): () => Promise<Content>;
    get scrollTo(): (path: JSONPath) => Promise<void>;
    get findElement(): (path: JSONPath) => Element | undefined;
    get focus(): () => Promise<void>;
    get refresh(): () => Promise<void>;
    get updateProps(): (props: JSONEditorPropsOptional) => Promise<void>;
    get destroy(): () => Promise<void>;
}

declare const __propDef$5: {
    props: {
        path: JSONPath;
        value: unknown;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type BooleanToggleProps = typeof __propDef$5.props;
type BooleanToggleEvents = typeof __propDef$5.events;
type BooleanToggleSlots = typeof __propDef$5.slots;
declare class BooleanToggle extends SvelteComponentTyped<BooleanToggleProps, BooleanToggleEvents, BooleanToggleSlots> {
}

declare const __propDef$4: {
    props: {
        path: JSONPath;
        value: string;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type ColorPickerProps = typeof __propDef$4.props;
type ColorPickerEvents = typeof __propDef$4.events;
type ColorPickerSlots = typeof __propDef$4.slots;
declare class ColorPicker extends SvelteComponentTyped<ColorPickerProps, ColorPickerEvents, ColorPickerSlots> {
}

declare const __propDef$3: {
    props: {
        path: JSONPath;
        value: unknown;
        selection: JSONSelection | undefined;
        mode: Mode;
        parser: JSONParser;
        normalization: ValueNormalization;
        enforceString: boolean;
        onPatch: OnPatch;
        onPasteJson: OnPasteJson;
        onSelect: OnJSONSelect;
        onFind: OnFind;
        focus: () => void;
        findNextInside: FindNextInside;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type EditableValueProps = typeof __propDef$3.props;
type EditableValueEvents = typeof __propDef$3.events;
type EditableValueSlots = typeof __propDef$3.slots;
declare class EditableValue extends SvelteComponentTyped<EditableValueProps, EditableValueEvents, EditableValueSlots> {
}

declare const __propDef$2: {
    props: {
        path: JSONPath;
        value: unknown;
        mode: Mode;
        parser: JSONParser;
        readOnly: boolean;
        selection: JSONSelection | undefined;
        onPatch: OnPatch;
        options: Array<{
            value: unknown;
            text: string;
        }>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type EnumValueProps = typeof __propDef$2.props;
type EnumValueEvents = typeof __propDef$2.events;
type EnumValueSlots = typeof __propDef$2.slots;
declare class EnumValue extends SvelteComponentTyped<EnumValueProps, EnumValueEvents, EnumValueSlots> {
}

declare const __propDef$1: {
    props: {
        path: JSONPath;
        value: unknown;
        mode: Mode;
        readOnly: boolean;
        normalization: ValueNormalization;
        parser: JSONParser;
        onSelect: OnJSONSelect;
        searchResultItems: ExtendedSearchResultItem[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type ReadonlyValueProps = typeof __propDef$1.props;
type ReadonlyValueEvents = typeof __propDef$1.events;
type ReadonlyValueSlots = typeof __propDef$1.slots;
declare class ReadonlyValue extends SvelteComponentTyped<ReadonlyValueProps, ReadonlyValueEvents, ReadonlyValueSlots> {
}

declare const __propDef: {
    props: {
        value: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type TimestampTagProps = typeof __propDef.props;
type TimestampTagEvents = typeof __propDef.events;
type TimestampTagSlots = typeof __propDef.slots;
declare class TimestampTag extends SvelteComponentTyped<TimestampTagProps, TimestampTagEvents, TimestampTagSlots> {
}

declare function renderValue({ path, value, mode, readOnly, selection, enforceString, searchResultItems, isEditing, parser, normalization, onPatch, onPasteJson, onSelect, onFind, findNextInside, focus }: RenderValueProps): RenderValueComponentDescription[];

/**
 * Search the JSON schema for enums defined at given props.path. If found,
 * return an EnumValue renderer. If not found, return null. In that case you
 * have to fallback on the default valueRender function
 */
declare function renderJSONSchemaEnum(props: RenderValueProps, schema: JSONSchema, schemaDefinitions?: JSONSchemaDefinitions): RenderValueComponentDescription[] | undefined;

declare function getValueClass(value: unknown, mode: Mode, parser: JSONParser): string;

declare global {
    interface Navigator {
        userAgentData?: {
            platform: string;
        };
    }
}
declare function isMacDevice(): boolean;

interface KeyComboEvent {
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    key: string;
}
/**
 * Get the active key combination from a keyboard event.
 * For example returns "Ctrl+Shift+ArrowUp" or "Ctrl+A"
 *
 * Returns the same output on both Windows and Mac:
 * meta keys "Ctrl" ("Command" on Mac), and "Alt" ("Alt" or "Option" on Mac)
 * So pressing "Command" and "A"on Mac will return "Ctrl+A"
 */
declare function keyComboFromEvent(event: KeyComboEvent, separator?: string, isMac?: typeof isMacDevice): string;

interface AjvValidatorOptions {
    schema: JSONSchema;
    schemaDefinitions?: JSONSchemaDefinitions;
    ajvOptions?: Options;
    onCreateAjv?: (ajv: Ajv) => Ajv | void;
}
/**
 * Create a JSON Schema validator powered by Ajv.
 * @param options
 * @property schema
 *                    The JSON schema to validate (required).
 * @property [schemaDefinitions=undefined]
 *                    An object containing JSON Schema definitions
 *                    which can be referenced using $ref
 * @property [ajvOptions=undefined]
 *                    Optional extra options for Ajv
 * @property [onCreateAjv=undefined]
 *                    An optional callback function allowing to apply additional
 *                    configuration on the provided Ajv instance, or return
 *                    your own Ajv instance and ignore the provided one.
 * @return Returns a validation function
 */
declare function createAjvValidator(options: AjvValidatorOptions): Validator;

declare const jsonQueryLanguage: QueryLanguage;

declare const jmespathQueryLanguage: QueryLanguage;

declare const jsonpathQueryLanguage: QueryLanguage;

declare const lodashQueryLanguage: QueryLanguage;

declare const javascriptQueryLanguage: QueryLanguage;

/**
 * Check whether a value is Content (TextContent or JSONContent)
 */
declare function isContent(content: unknown): content is Content;
/**
 * Check whether content contains text (and not JSON)
 */
declare function isTextContent(content: unknown): content is TextContent;
/**
 * Check whether content contains json
 */
declare function isJSONContent(content: unknown): content is JSONContent;
/**
 * Convert Content into TextContent if it is JSONContent, else leave it as is
 */
declare function toTextContent(content: Content, indentation?: number | string | undefined, parser?: JSONParser): TextContent;
/**
 * Convert Content into TextContent if it is JSONContent, else leave it as is
 * @throws {SyntaxError} Will throw a parse error when the text contents does not contain valid JSON
 */
declare function toJSONContent(content: Content, parser?: JSONParser): JSONContent;
/**
 * Returns true when the (estimated) size of the contents exceeds the
 * provided maxSize.
 * @param content
 * @param maxSize  Maximum content size in bytes
 */
declare function isLargeContent(content: Content, maxSize: number): boolean;
/**
 * A rough, fast estimation on whether a document is larger than given size
 * when serialized.
 *
 * maxSize is an optional max size in bytes. When reached, size estimation will
 * be cancelled. This is useful when you're only interested in knowing whether
 * the size exceeds a certain maximum size.
 */
declare function estimateSerializedSize(content: Content, maxSize?: number): number;
/**
 * Check whether the actual functions of parse and stringify are strictly equal.
 * The object holding the functions may be a differing instance.
 */
declare function isEqualParser(a: JSONParser, b: JSONParser): boolean;

/**
 * Expand the root array or object, and in case of an array, expand the first array item
 */
declare function expandMinimal(relativePath: JSONPath): boolean;
/**
 * Expand the root array or object
 */
declare function expandSelf(relativePath: JSONPath): boolean;
declare function expandAll(): boolean;
declare function expandNone(): boolean;

declare function isAfterSelection(selection: JSONEditorSelection | undefined): selection is AfterSelection;
declare function isInsideSelection(selection: JSONEditorSelection | undefined): selection is InsideSelection;
declare function isKeySelection(selection: JSONEditorSelection | undefined): selection is KeySelection;
declare function isValueSelection(selection: JSONEditorSelection | undefined): selection is ValueSelection;
declare function isMultiSelection(selection: JSONEditorSelection | undefined): selection is MultiSelection;
/**
 * Expand a selection start and end into an array containing all paths
 * between (and including) start and end
 */
declare function getSelectionPaths(json: unknown, selection: JSONSelection): JSONPath[];
declare function getStartPath(json: unknown, selection: JSONSelection): JSONPath;
declare function getEndPath(json: unknown, selection: JSONSelection): JSONPath;
declare function createKeySelection(path: JSONPath): KeySelection;
declare function createEditKeySelection(path: JSONPath, initialValue?: string): EditKeySelection;
declare function createValueSelection(path: JSONPath): ValueSelection;
declare function createEditValueSelection(path: JSONPath, initialValue?: string): EditValueSelection;
declare function createInsideSelection(path: JSONPath): InsideSelection;
declare function createAfterSelection(path: JSONPath): AfterSelection;
declare function createMultiSelection(anchorPath: JSONPath, focusPath: JSONPath): MultiSelection;
declare function isEditingSelection(selection: JSONSelection | undefined): selection is EditKeySelection | EditValueSelection;
declare function getFocusPath(selection: JSONSelection): JSONPath;
declare function getAnchorPath(selection: JSONSelection): JSONPath;

/**
 **
 * Stringify an array with a path like ['items', '3', 'name'] into string like 'items[3].name'
 * Note that we allow all characters in a property name, like "item with spaces[3].name",
 * so this path is not usable as-is in JavaScript.
 */
declare function stringifyJSONPath(path: JSONPath): string;
/**
 * Parse a JSON path like 'items[3].name' into a path like ['items', '3', 'name']
 */
declare function parseJSONPath(pathStr: string): JSONPath;

/**
 * Example usage:
 *
 *   <script lang="ts">
 *      let clientWidth = 0
 *   </script>
 *
 *   <div use:resizeObserver={element => clientWidth = element.clientWidth}>
 *      My width is: {clientWidth}
 *   </div>
 */
declare function resizeObserver(element: Element, onResize: (element: Element) => void): {
    destroy: () => void;
};

type Callback = () => void;
/**
 * The provided callback is invoked when the user presses Escape, and then stops propagation of the event.
 */
declare function onEscape(element: HTMLElement | undefined, callback: Callback): {
    destroy(): void;
} | undefined;

/**
 * Test whether a value is an Object (and not an Array or Class)
 */
declare function isObject(value: unknown): value is Record<string, unknown>;
/**
 * Test whether a value is an Object or an Array (and not a Class)
 */
declare function isObjectOrArray(value: unknown): value is object | Array<unknown>;
/**
 * Test whether a value is a boolean
 *
 * @param {*} value
 * @return {boolean}
 */
declare function isBoolean(value: unknown): value is boolean;
/**
 * Test whether a value is a timestamp in milliseconds after the year 2000.
 */
declare function isTimestamp(value: unknown): boolean;
/**
 * Test if a string contains a valid color name or code.
 * Returns true if a valid color, false otherwise
 */
declare function isColor(value: unknown): boolean;
/**
 * Get the type of the value
 */
declare function valueType(value: unknown, parser: JSONParser): string;
declare function isUrl(text: unknown): boolean;
/**
 * Convert contents of a string to the correct JSON type. This can be a string,
 * a number, a boolean, etc
 */
declare function stringConvert(str: string, parser: JSONParser): unknown;

declare function isMenuSpace(item: unknown): item is MenuSpace;
declare function isMenuSeparator(item: unknown): item is MenuSeparator;
declare function isMenuLabel(item: unknown): item is MenuLabel;
declare function isMenuButton(item: unknown): item is MenuButton;
declare function isMenuDropDownButton(item: unknown): item is MenuDropDownButton;
declare function isContextMenuRow(item: unknown): item is ContextMenuRow;
declare function isContextMenuColumn(item: unknown): item is ContextMenuColumn;
declare function isContentParseError(contentErrors: unknown): contentErrors is ContentParseError;
declare function isContentValidationErrors(contentErrors: unknown): contentErrors is ContentValidationErrors;
declare function isValidationError(value: unknown): value is ValidationError;
declare function isNestedValidationError(value: unknown): value is NestedValidationError;
declare function isSvelteComponentRenderer(value: unknown): value is SvelteComponentRenderer;
declare function isSvelteActionRenderer(value: unknown): value is SvelteActionRenderer;
declare function isObjectRecursiveState(state: RecursiveState | undefined): state is ObjectRecursiveState;
declare function isArrayRecursiveState(state: RecursiveState | undefined): state is ArrayRecursiveState;
declare function isValueRecursiveState(state: RecursiveState | undefined): state is ValueRecursiveState;
declare function isExpandableState(state: RecursiveState | undefined): state is ObjectRecursiveState | ArrayRecursiveState;
declare function hasSearchResults(state: SearchResults | undefined): state is WithSearchResults;

interface CreateJSONEditorProps {
    target: HTMLDivElement;
    props: JSONEditorPropsOptional;
}
declare function createJSONEditor({ target, props }: CreateJSONEditorProps): JsonEditor;
/**
 * The constructor "new JSONEditor(...)" is deprecated. Please use "createJSONEditor(...)" instead.
 * @constructor
 * @deprecated
 */
declare function JSONEditor({ target, props }: CreateJSONEditorProps): JsonEditor;

export type { JsonEditor, CreateJSONEditorProps }

export { type AbsolutePopupContext, type AbsolutePopupOptions, type AfterPatchCallback, type AfterSelection, type AjvValidatorOptions, type ArrayDocumentState, type ArrayRecursiveState, type ArraySearchResults, type ArrayValidationErrors, BooleanToggle, type CaretPosition, CaretType, type ClipboardValues, ColorPicker, type Content, type ContentErrors, type ContentParseError, type ContentValidationErrors, type ContextMenuColumn, type ContextMenuItem, type ContextMenuRow, type ConvertType, type DocumentState, type DragInsideAction, type DragInsideProps, type DraggingState, type EditKeySelection, type EditValueSelection, EditableValue, EnumValue, type EscapeValue, type ExtendedSearchResultItem, type FindNextInside, type HistoryItem, type InsertType, type InsideSelection, type JSONContent, JSONEditor, type JSONEditorContext, type JSONEditorModalCallback, type JSONEditorModalProps, type JSONEditorPropsOptional, type JSONEditorSelection, type JSONParser, type JSONPatchResult, type JSONPathParser, type JSONRepairModalProps, type JSONSchema, type JSONSchemaDefinitions, type JSONSchemaEnum, type JSONSelection, type KeySelection, type MenuButton, type MenuDropDownButton, type MenuItem, type MenuLabel, type MenuSeparator, type MenuSpace, type MessageAction, Mode, type MultiSelection, type NestedValidationError, type NumberOption, type ObjectDocumentState, type ObjectRecursiveState, type ObjectSearchResults, type ObjectValidationErrors, type OnBlur, type OnChange, type OnChangeMode, type OnChangeQueryLanguage, type OnChangeStatus, type OnChangeText, type OnClassName, type OnContextMenu, type OnError, type OnExpand, type OnFind, type OnFocus, type OnJSONEditorModal, type OnJSONSelect, type OnPaste, type OnPasteJson, type OnPatch, type OnRenderContextMenu, type OnRenderContextMenuInternal, type OnRenderMenu, type OnRenderMenuInternal, type OnRenderValue, type OnSelect, type OnSort, type OnSortModal, type OnTransformModal, type ParseError, type PastedJson, type PathOption, type PopupEntry, type QueryLanguage, type QueryLanguageOptions, ReadonlyValue, type RecursiveState, type RecursiveStateFactory, type RenderContextMenuContext, type RenderMenuContext, type RenderValueComponentDescription, type RenderValueProps, type RenderValuePropsOptional, type RenderedItem, type RichValidationError, SearchField, type SearchOptions, type SearchResultDetails, type SearchResultItem, type SearchResults, type Section, SelectionType, SortDirection, type SortModalCallback, type SortedColumn, type SvelteActionRenderer, type SvelteComponentRenderer, type TableCellIndex, type TextContent, type TextLocation, type TextSelection, TimestampTag, type TransformModalCallback, type TransformModalOptions, type TransformModalProps, type TreeModeContext, type UnescapeValue, UpdateSelectionAfterChange, type ValidationError, type ValidationErrors, ValidationSeverity, type Validator, type ValueDocumentState, type ValueNormalization, type ValueRecursiveState, type ValueSearchResults, type ValueSelection, type ValueValidationErrors, type VisibleSection, type WithSearchResults, createAfterSelection, createAjvValidator, createEditKeySelection, createEditValueSelection, createInsideSelection, createJSONEditor, createKeySelection, createMultiSelection, createValueSelection, estimateSerializedSize, expandAll, expandMinimal, expandNone, expandSelf, getAnchorPath, getEndPath, getFocusPath, getSelectionPaths, getStartPath, getValueClass, hasSearchResults, isAfterSelection, isArrayRecursiveState, isBoolean, isColor, isContent, isContentParseError, isContentValidationErrors, isContextMenuColumn, isContextMenuRow, isEditingSelection, isEqualParser, isExpandableState, isInsideSelection, isJSONContent, isKeySelection, isLargeContent, isMenuButton, isMenuDropDownButton, isMenuLabel, isMenuSeparator, isMenuSpace, isMultiSelection, isNestedValidationError, isObject, isObjectOrArray, isObjectRecursiveState, isSvelteActionRenderer, isSvelteComponentRenderer, isTextContent, isTimestamp, isUrl, isValidationError, isValueRecursiveState, isValueSelection, javascriptQueryLanguage, jmespathQueryLanguage, jsonQueryLanguage, jsonpathQueryLanguage, keyComboFromEvent, lodashQueryLanguage, onEscape, parseJSONPath, renderJSONSchemaEnum, renderValue, resizeObserver, stringConvert, stringifyJSONPath, toJSONContent, toTextContent, valueType };

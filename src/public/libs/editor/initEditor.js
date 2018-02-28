/**
 * 初始化editor
 * Created by wujj on 2016/11/30.
 */
var simplemde = new SimpleMDE({
    autofocus: false, //光标聚焦
    autosave: {
        enabled: false, //是否自动保存
        uniqueId: "postTopic",
        delay: 5000,
    },
    element: document.getElementById("editor"),
    forceSync: true,
    hideIcons: ["guide", "heading"],
    indentWithTabs: false,
    insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
    },
    lineWrapping: true, //自动换行
    parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: false,
        underscoresBreakWords: true,
    },
    placeholder: "write here...",
   // previewRender: function(plainText, preview) { // Async method
   //     setTimeout(function(){
   //         preview.innerHTML = customMarkdownParser(plainText);
   //     }, 250);
   //
   //     return "Loading...";
   // },
    promptURLs: true,
    renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
    },
    shortcuts: {
        drawTable: "Cmd-Alt-T"
    },
    showIcons: ["code", "table"],
    spellChecker: false,
    status: ["autosave", "lines", "words", "cursor", {
        className: "keystrokes",
        defaultValue: function(el) {
            this.keystrokes = 0;
            el.innerHTML = "0 Keystrokes";
        },
        onUpdate: function(el) {
            el.innerHTML = ++this.keystrokes + " Keystrokes";
        }
    }],
    styleSelectedText: false,
    tabSize: 4
});

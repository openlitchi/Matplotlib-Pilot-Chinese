import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';


let html_string_part1: string = `<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name = "viewport" />
        <title>
            snippet
        </title>
<style type = "text/css" >
   :root {
  --container-paddding: 20px;
  --input-padding-vertical: 6px;
  --input-padding-horizontal: 4px;
  --input-margin-vertical: 4px;
  --input-margin-horizontal: 0;
}

body {
  padding: 0 var(--container-paddding);
  color: var(--vscode-foreground);
  font-size: var(--vscode-font-size);
  font-weight: var(--vscode-font-weight);
  font-family: var(--vscode-font-family);
  background-color: var(--vscode-editor-background);
}

ol,
ul {
    padding-left: var(--container-paddding);
}

body > *,
form > * {
  margin-block-start: var(--input-margin-vertical);
  margin-block-end: var(--input-margin-vertical);
}

*:focus {
  outline-color: var(--vscode-focusBorder) !important;
}

a {
  color: var(--vscode-textLink-foreground);
}

a:hover,
a:active {
  color: var(--vscode-textLink-activeForeground);
}

code {
  font-size: var(--vscode-editor-font-size);
  font-family: var(--vscode-editor-font-family);
}

button {
    border: none;
    flex-basis: calc(50% - 1px); /* 每个按钮占据50%宽度减去半个gap，以适应间距 */
    text-align: center;
    outline: 1px solid transparent;
    outline-offset: 2px !important;
    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
    color: var(--vscode-button-foreground);
    background: var(--vscode-button-background);
}

button:hover {
  cursor: pointer;
  background: var(--vscode-button-hoverBackground);
}

button:focus {
  outline-color: var(--vscode-focusBorder);
}

button.secondary {
  color: var(--vscode-button-secondaryForeground);
  background: var(--vscode-button-secondaryBackground);
}

button.secondary:hover {
  background: var(--vscode-button-secondaryHoverBackground);
}

input:not([type="checkbox"]),
textarea {
  display: block;
  width: 100%;
  border: none;
  font-family: var(--vscode-font-family);
  padding: var(--input-padding-vertical) var(--input-padding-horizontal);
  color: var(--vscode-input-foreground);
  outline-color: var(--vscode-input-border);
  background-color: var(--vscode-input-background);
}

input::placeholder,
textarea::placeholder {
  color: var(--vscode-input-placeholderForeground);
}
</style>
</head>
<body>`;

let html_string_part2: string = `<div id="colorWrapper" style="display: flex; align-items: center;">
   <div id="colorValue" onclick="copyColorValue()" style="text-align: center; margin-right: 2px; width: 80%; text-overflow: ellipsis; white-space: nowrap;">
    #0e639c
   </div>
   <input id="color" name="color" style="height: 32px; aspect-ratio: 1;" title="获取指定颜色的十六进制颜色表示" type="color" value="#0e639c"/>
  </div>
  <h4 style="text-align: center;">
   其它工具
  </h4>
  <button id="concept" style="width: 100%;" title="查看颜色-color、标识符-marker、线型-linestyle、cmp等常见概念">
   常见概念
  </button>
  <button id="template" style="width: 100%;" title="打开notebook模板视图，点击按钮在本地生成">
   绘图模板
  </button>
  <button id="customTemplate" style="width: 100%;" title="打开自定模板网页视图">
   自定义模板
  </button>
  <!-- <button id="tutorial" title="教程视频链接" style="width: 100%;">演示视频</button> -->

  <script type="text/javascript">
   const vscode = acquireVsCodeApi();
let clickCount = 0;
let timer;

const buttons = document.querySelectorAll('button');

// 假设buttons是一个包含你想要添加事件监听器的按钮元素的数组
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        clickCount++;

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            if (clickCount === 1) {
                vscode.postMessage({
                    "id": this.id,
                    "snippets": this.dataset.snippets,
                    "comment": this.dataset.comment,
                    "event": "click"
                });
            }
            else {
                vscode.postMessage({
                    "id": this.id,
                    "snippets": this.dataset.snippets,
                    "comment": this.dataset.comment,
                    "event": "doubleClick"
                });
            }
            clickCount = 0;
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('color');
    const colorValueDisplay = document.getElementById('colorValue');

    // 监听颜色选择器的 input 事件
    colorPicker.addEventListener('input', function (event) {
        const newColor = event.target.value;
        colorValueDisplay.textContent = newColor;

    });

    colorPicker.addEventListener('blur',  function(){
        copyColorValue();
    });
});

// 复制颜色值的函数
function copyColorValue() {
    const colorValueDisplay = document.getElementById('colorValue');
    const colorValue = colorValueDisplay.textContent.trim();
    navigator.clipboard.writeText(colorValue);
}
  </script>
 </body>
</html>`;

// 创建一个Button元素的HTML字符串，并添加data-snippets属性
function createButton(snippets: string, name: string, title: string): string {
    // 手动转义snippets中的双引号
    const escapedSnippets = snippets.replace(/"/g, '&quot;');
    if (title) {
        return `<button title="${title}" 
            data-snippets="${escapedSnippets}" 
            data-comment="${escapedSnippets}" 
            style="width: 48%;">${name}</button>`;
    } else {
        return `<button data-snippets="${escapedSnippets}" 
            data-comment="${escapedSnippets}" 
            style="width: 48%;">${name}</button>`;
    }

}

// 创建一个<h4>标签
function createH4Header(title: string): string {
    return `<h4 style="text-align: center;">${title}</h4>`;
}


// 处理.ipynb文件并返回元素列表
function ipynb2sidebarHtmlString(notebookContent: string): string {
    // 读取.ipynb文件
    // const notebookContent = fs.readFileSync(filePath, 'utf-8');
    const notebook = JSON.parse(notebookContent);

    const elements: string[] = [];

    // 遍历每个单元格
    for (const cell of notebook.cells) {
        if (cell.cell_type === 'code') { // 检查是否为代码单元格
            let sourceLines: string[] = [];
            if (typeof cell.source === 'string') {
                sourceLines = [cell.source];
            } else if (Array.isArray(cell.source)) {
                sourceLines = cell.source;
            }

            const combinedSource = sourceLines.join('');
            const lines = combinedSource.split('\n');
            if (lines.length > 0 && lines[0].startsWith('#')) { // 第一行是注释
                try {
                    const comment = lines[0].slice(1).trim(); // 去掉#号及首尾空白字符
                    const data = JSON.parse(comment);
                    if ('name' in data) {
                        const name = data.name;
                        // 将剩余行组合成一个字符串，并作为data-snippets的值
                        const snippets = lines.slice(1).join('\n');
                        if ('title' in data) {
                            elements.push(createButton(snippets, name, data.title));
                        } else {
                            elements.push(createButton(snippets, name, ""));
                        }

                    }
                } catch (error) {
                    console.warn(`Warning: Invalid JSON comment ${lines[0].slice(1).trim()}`);
                }
            }
        } else if (cell.cell_type === 'markdown') { // 检查是否为Markdown单元格
            let sourceLines: string[] = [];
            if (typeof cell.source === 'string') {
                sourceLines = [cell.source];
            } else if (Array.isArray(cell.source)) {
                sourceLines = cell.source;
            }

            const combinedSource = sourceLines.join('\n');
            if (combinedSource.startsWith('## ')) { // 检查是否为二级标题
                const title = combinedSource.slice(3).trim(); // 去掉前三个字符（两个#和空格）
                elements.push(createH4Header(title));
            }
        }
    }

    return html_string_part1 + elements.join('\n') + html_string_part2;
}

export async function refreshSidebar(context: vscode.ExtensionContext) {
    const notebookPath = path.join(
        context.extensionUri.fsPath,
        'snippets',
        'snippets.ipynb'
    );

    const uri = vscode.Uri.file(notebookPath);
    let nb_string = await fs.readFile(uri.fsPath, 'utf-8');

    let htmlString: string = ipynb2sidebarHtmlString(nb_string);

    const newFilePath = path.join(path.dirname(uri.fsPath), 'snippets3.html');
    await fs.writeFile(newFilePath, htmlString);
    vscode.window.showInformationMessage(`HTML文件已写入 ${newFilePath} 中。`);
}

export async function modifySidebar(context: vscode.ExtensionContext) {
    const notebookPath = path.join(
        context.extensionUri.fsPath,
        'snippets',
        'snippets.ipynb'
    );

    const uri = vscode.Uri.file(notebookPath);
    await vscode.commands.executeCommand('vscode.open', uri);
}
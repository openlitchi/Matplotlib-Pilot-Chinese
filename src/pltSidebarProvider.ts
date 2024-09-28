import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let conceptPanel: vscode.WebviewPanel | undefined;
let templatePanel: vscode.WebviewPanel | undefined;
let customTemplatePanel: vscode.WebviewPanel | undefined;

export default class PltSidebarProvider {
    constructor(private readonly extensionUri: vscode.Uri) { }

    async resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        // load html in sidebar
        webviewView.webview.html = await this.getHtmlForWebview(webviewView.webview);

        // 监听消息
        webviewView.webview.onDidReceiveMessage(message => {
            const editor = vscode.window.activeTextEditor!;

            if ("snippets" in message) {
                let text = message.snippets;
                let commentWhenClick = vscode.workspace.getConfiguration().get('plt-snippet.commentWhenClick') as boolean;
                let commentWhenDoubleClick = vscode.workspace.getConfiguration().get('plt-snippet.commentWhenDoubleClick') as boolean;

                if (message.event === "click" && commentWhenClick) {
                    text = message.comment;
                }

                if (message.event === "doubleClick" && commentWhenDoubleClick) {
                    text = message.comment;
                }

                editor.edit((build) => {
                    // 将传回snippets粘贴到编辑器中
                    build.insert(editor.selection.end, text);
                });
            }

            // 打开 concept 页面
            if (message.id === "concept") {
                this.openConcept();
            }

            // 打开 template 页面
            if (message.id === "template") {
                this.openTemplate();
            }

            // 打开 custom template 页面
            if (message.id === "customTemplate") {
                this.openCustomTemplate();
            }

            if (message.id === "tutorial") {
                vscode.window.showInformationMessage('随后上线!可以通过`Ctrl+,`设置tutorialBotton变量关闭（重启生效）');
            }

            return;
        });

    }

    async getHtmlForWebview(webview: vscode.Webview) {
        // 读取外部html文件
        const filePath = path.join(this.extensionUri.fsPath, 'snippets', 'snippets3.html');
        let html = fs.readFileSync(filePath, 'utf8');

        // </button><button id="tutorial">演示视频</button>
        let tutorialBotton: boolean = vscode.workspace.getConfiguration().get('plt-snippet.tutorialBotton') as boolean;
        if (!tutorialBotton) {
            html = html.replace(/<\/button><button id="tutorial">演示视频<\/button>/g, ``);
        }

        return html;
    }

    async generateFile(filename: string, content: string) {
        if (vscode.workspace.workspaceFolders === undefined || vscode.workspace.workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('请先打开工作区.');
            return;
        }
        const workspaceFolder = vscode.workspace.workspaceFolders[0];

        // 写入新的 ipynb 文件
        const newFilePath = path.join(workspaceFolder.uri.fsPath + `/${filename}`);
        fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
        fs.writeFileSync(newFilePath, content);

        vscode.window.showInformationMessage(`文件 ${filename} 在工作区路径创建成功`);
    }

    async generateLocalIPYNB(filename: string, templatePath: string) {
        if (vscode.workspace.workspaceFolders === undefined || vscode.workspace.workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('请先打开工作区.');
            return;
        }
        const workspaceFolder = vscode.workspace.workspaceFolders[0];

        // 读取模板文件内容
        fs.readFile(templatePath, 'utf-8', (err, template) => {
            if (err) {
                vscode.window.showErrorMessage(`读取文件 ${templatePath} 时发生错误，${err}`);
                return;
            }

            // 写入新的 ipynb 文件
            const newFilePath = path.join(workspaceFolder.uri.fsPath + `/${filename}`);
            fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
            fs.writeFileSync(newFilePath, template);

            vscode.window.showInformationMessage(`文件 ${filename} 在工作区路径创建成功`);
        });
    }

    checkFileExist(filename: string): boolean {
        const workspaceFolder = vscode.workspace.workspaceFolders![0];
        const targetPath = path.join(workspaceFolder.uri.fsPath, filename);
        return fs.existsSync(targetPath);
    }

    openConcept() {
        if (conceptPanel) {
            conceptPanel.reveal(vscode.ViewColumn.One);
        } else {
            const conceptFilePath = path.join(this.extensionUri.fsPath, 'pages', 'concept.html');
            let conceptHtml = fs.readFileSync(conceptFilePath, 'utf8');
            conceptPanel = vscode.window.createWebviewPanel(
                'concept',
                '常见概念',
                vscode.ViewColumn.One,
                {}
            );
            conceptPanel.webview.html = conceptHtml;

            conceptPanel.onDidDispose(() => {
                conceptPanel = undefined;
            });
        }
    }

    openTemplate() {
        if (templatePanel) {
            templatePanel.reveal(vscode.ViewColumn.One);
        } else {
            const filePath = path.join(this.extensionUri.fsPath, 'pages', 'template.html');
            let html = fs.readFileSync(filePath, 'utf8');
            templatePanel = vscode.window.createWebviewPanel(
                'template',
                '绘图模板',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );
            templatePanel.webview.html = html;

            templatePanel.webview.onDidReceiveMessage(async message => {
                const fileName = await vscode.window.showInputBox({ prompt: '请输入ipynb文件名（无需后缀名）' });
                if (!fileName) {
                    vscode.window.showErrorMessage('未输入文件名.');
                    return;
                }

                const isFileExist = this.checkFileExist(fileName + '.ipynb');
                if (isFileExist) {
                    vscode.window.showWarningMessage(`文件 ${fileName}.ipynb 已存在，请更换名字或先手动移除该文件`);
                    return;
                }

                await this.generateFile(fileName + '.ipynb', message.ipynb);
            });

            templatePanel.onDidDispose(() => {
                templatePanel = undefined;
            });
        }
    }

    openCustomTemplate() {
        if (customTemplatePanel) {
            customTemplatePanel.reveal();
        } else {
            let customTemplateHtml: fs.PathOrFileDescriptor = vscode.workspace.getConfiguration().get('plt-snippet.customTemplateHtml') as fs.PathOrFileDescriptor;

            if (customTemplateHtml === "") {
                vscode.window.showInformationMessage("请先在VS Code的设置界面通过变量Custom Template HTML设置模板网页路径，模板网页制作方式见插件主页Overview一栏");
                return;
            }

            fs.readFile(customTemplateHtml, 'utf8', (err, html) => {
                if (err) {
                    vscode.window.showInformationMessage(`读取文件 ${customTemplateHtml} 时发生错误，${err}`);
                    return;
                }

                customTemplatePanel = vscode.window.createWebviewPanel(
                    'CustomTemplate',
                    '自定义模板',
                    vscode.ViewColumn.One,
                    {
                        enableScripts: true
                    }
                );
                customTemplatePanel.webview.html = html;

                customTemplatePanel.webview.onDidReceiveMessage(async message => {
                    const filename = await vscode.window.showInputBox({ prompt: '请输入ipynb文件名（无需后缀名）' });
                    if (!filename) {
                        vscode.window.showErrorMessage('未输入文件名.');
                        return;
                    }

                    const isFileExist = this.checkFileExist(filename + '.ipynb');
                    if (isFileExist) {
                        vscode.window.showWarningMessage(`文件 ${filename}.ipynb 已存在，请更换名字或先手动移除该文件`);
                        return;
                    }
                    console.log(message.id);
                    console.log(message.ipynbpath);
                    await this.generateLocalIPYNB(filename + '.ipynb', message.ipynbpath);
                });

                customTemplatePanel.onDidDispose(() => {
                    customTemplatePanel = undefined;
                });
            });
        }
    }

}
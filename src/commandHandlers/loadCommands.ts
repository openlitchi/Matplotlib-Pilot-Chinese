import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path'; // 导入 path 模块

export async function loadtxt(context: vscode.ExtensionContext) {
    let snippet: string = `data = np.loadtxt(fname=r'./data.csv', 
                    dtype=float, skiprows=1, delimiter=',')`;

    const options: vscode.OpenDialogOptions = {
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        openLabel: 'Open File',
        filters: {
            'Text files': ['txt', 'csv'],
            'All files': ['*']
        }
    };

    const openfileUris = await vscode.window.showOpenDialog(options);
    if (openfileUris && openfileUris.length > 0) {
        const openfileUri = openfileUris[0];
        const filename = openfileUri.fsPath.split(path.sep).pop(); // 获取文件名
        vscode.window.showInformationMessage(`File: ${filename}\nPath: ${openfileUri.fsPath}`);
        snippet = snippet.replace(`./data.csv`, `${openfileUri.fsPath}`);

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.end, snippet);
            });
        }
    }
}

export async function load(context: vscode.ExtensionContext) {
    let snippet: string = "data = np.load(file=r'./data.npy')";

    const options: vscode.OpenDialogOptions = {
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        openLabel: 'Open File',
        filters: {
            'Text files': ['npy'],
            'All files': ['*']
        }
    };

    const openfileUris = await vscode.window.showOpenDialog(options);
    if (openfileUris && openfileUris.length > 0) {
        const openfileUri = openfileUris[0];
        const filename = openfileUri.fsPath.split(path.sep).pop(); // 获取文件名
        vscode.window.showInformationMessage(`File: ${filename}\nPath: ${openfileUri.fsPath}`);
        snippet = snippet.replace(`./data.npy`, `${openfileUri.fsPath}`);

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.end, snippet);
            });
        }
    }
}
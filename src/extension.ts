import * as vscode from 'vscode';
import PltSidebarProvider from './pltSidebarProvider';
import { defineCustomTemplate } from './commandHandlers/defineCustomTemplate';
import { loadtxt, load } from './commandHandlers/loadCommands';
import { refreshSidebar, modifySidebar } from './commandHandlers/sidebarCommands';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';


const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);


export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "matplotlib-pilot" is now active!');


    // 自定义命令
    context.subscriptions.push(
        vscode.commands.registerCommand('plt-snippet.defineCustomTemplate', () => defineCustomTemplate(context)),
        vscode.commands.registerCommand('plt-snippet.loadtxt', () => loadtxt(context)),
        vscode.commands.registerCommand('plt-snippet.load', () => load(context)),
        vscode.commands.registerCommand('plt-snippet.refreshSidebar', () => refreshSidebar(context)),
        vscode.commands.registerCommand('plt-snippet.modifySidebar', () => modifySidebar(context))
    );

    // pltSidebarView
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'pltSidebarView',
            new PltSidebarProvider(context.extensionUri)
        )
    );

}


// This method is called when your extension is deactivated
export function deactivate() {
    console.log('Extension "matplotlib-pilot" is now deactived!');
}

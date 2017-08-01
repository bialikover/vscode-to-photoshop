'use strict';

import * as vscode from 'vscode';
import * as osascript from 'node-osascript';

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vsc-ps" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.evaluateScript', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Evaluating Extend Script');

        let editor = vscode.window.activeTextEditor;

        if (!editor) {
            return;
        }
        let selection = editor.selection;
        let text = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);
        let script = `tell application "Adobe Photoshop CC 2017.1.1" to do javascript "(${text})"`;
        let outputChannel = vscode.window.createOutputChannel('Extend Script');
        //show the output.
        outputChannel.show()
        osascript.execute(script, (err, res, raw)=>{
            if(err){
                showOutput(err);
                return;
            }
            showOutput(res);
        })

        function showOutput(message:string){
            outputChannel.append(`${new Date().toISOString()} ${message}`);

          }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
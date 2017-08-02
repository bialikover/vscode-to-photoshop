'use strict';

import * as vscode from 'vscode';
import * as osascript from 'node-osascript';
import * as fs from 'fs'

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
        let outputChannel = vscode.window.createOutputChannel('Extend Script');
        let pathTojsx = './tmp/file.jsx';
        fs.writeFile(pathTojsx, text, function(err){
            if(err){showOutput(`error: ${err.message} \n stack: ${err.stack}`)}
            let script = `tell application id "com.adobe.Photoshop" to do javascript ("#include ${pathTojsx}")`;
            //show the output.
            outputChannel.show()
            osascript.execute(script, (err, res, raw)=>{
                if(err){
                    showOutput(err);
                    return;
                }
                showOutput(res);
            })
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
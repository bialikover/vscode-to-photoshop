'use strict';

import * as vscode from 'vscode';
import * as osascript from 'node-osascript';
import * as fs from 'fs'

export function activate(context: vscode.ExtensionContext) {

    console.log('vscode-to-photoshop is now active');
    let outputChannel = vscode.window.createOutputChannel('Extend Script');
    let disposable = vscode.commands.registerCommand('extension.evaluateScript', () => {
        vscode.window.showInformationMessage('Evaluating Extend Script');

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let selection = editor.selection;
        let text = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);
        
        let pathTojsx = './tmp/file.jsx';
        fs.writeFile(pathTojsx, text, function(err){
            if(err){showOutput(`error: ${err.message} \n stack: ${err.stack}`)}
            let script = `tell application id "com.adobe.Photoshop" to do javascript ("#include ${pathTojsx}")`;
            //show the output.
            outputChannel.show();
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
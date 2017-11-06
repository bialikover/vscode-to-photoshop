'use strict';

import * as vscode from 'vscode';
import * as osascript from 'node-osascript';
import * as fs from 'fs';
import * as cs from 'child_process';
import * as path from 'path';

const WINDOWS = 'win32';
const OSX = 'darwin';

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

        let pathTojsx = path.resolve(__dirname, 'tmp_file.jsx');
        
        fs.writeFile(pathTojsx, text, (err) => {
            if (err) { return showOutput(`error: ${err.message} \n stack: ${err.stack}`) }
            //show the output.
            outputChannel.show();

            if (process.platform === WINDOWS) {
                let script = `wscript ${path.resolve(__dirname, '../../photoshop.vbs')} ${pathTojsx} ""`;
                cs.exec(script, cb);
            }

            if (process.platform === OSX) {
                let script = `tell application id "com.adobe.Photoshop" to do javascript ("#include ${pathTojsx}")`;
                osascript.execute(script, cb);
            }

        });

        function cb(err, res, raw) {
            if (err) { return showOutput(`error: ${err.message} \n stack: ${err.stack}`) };
            showOutput(res);
        }

        function showOutput(message: string) {
            outputChannel.append(`${new Date().toISOString()} ${message}`);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
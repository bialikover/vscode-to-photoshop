# vscode-to-photoshop

vscode to photoshop is an extension for Visual Studio Code to execute a JSX file in Photoshop.

## Features
This extension allows you to write Extend Script and evaluate in photoshop directly from visual studio code.

![vscode-to-photoshop](images/vscode-to-photoshop.gif)
## Usage
- Install the extension from the market place.
- Press cmd + shift + p to open the command palete
- type in: extend script and it will show the command.
- When selected it will take the text from your active file or the current selection in the file. Then the extension will evaluate in photoshop your file.
- Once it's completed you will se the result on the output panel under Extend Script log.

## Requirements
You will need Phostoshop CC 2015 or greater installed 

## Known Issues

On windows: `wscript` is not returning any result to Extend Script log.

## Release Notes

1. Functionality to evaluate scripts without saving, 
1. Functionality to evaluate text selected
1. Functionality to evaluate text selected

## Development

1. clone the repo
2. `npm install`
3. open with **vscode**
4. press `f5` to start debuging the extension in vscode

## Version history

### 0.0.3

- Added initial support for windows.
### 0.0.2

- Updated image folder 
- Updated package.json with repository and icons
### 0.0.1

Initial release of vscode to photoshop

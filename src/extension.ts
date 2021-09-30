// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { URI } from 'vscode-uri'

export function deactivate() {}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('notetree.activate', commandActivate),
		vscode.commands.registerCommand('notetree.save', commandSave),
		vscode.commands.registerCommand('notetree.find', commandFind),
		vscode.commands.registerCommand('notetree.next', commandNext),
		vscode.commands.registerCommand('notetree.previous', commandPrevious)
	);
}

function commandActivate() {
	vscode.window.showInformationMessage('commandActivate');
}

function commandSave() {
	vscode.window.showInformationMessage('commandSave');

	let path = getCurFilePath();
	if (path)
	{
		executeCommandInDirectory("git add . && git commit -m \"AutoCommit\"");
	}
}

async function commandFind() {
	vscode.window.showInformationMessage('commandFind');
	let searchString = await vscode.window.showInputBox();

	if (searchString)
	{
		executeCommandInDirectory("git log -G" + searchString);
	}
}

function commandNext() {
	vscode.window.showInformationMessage('commandNext');
}

function commandPrevious() {
	vscode.window.showInformationMessage('commandPrevious');
}

function executeCommandInDirectory(command: string) {
	executeCommand("cd " + getCurFilePath() + " && " + command);
}

function executeCommand(command: string) {
	const cp = require('child_process');

	cp.exec(command, (err: any, stdout: any, stderr: any) => {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (err) {
			console.log('error: ' + err);
		}
	});
}

function getCurFilePath() {
	let uri = vscode.window.activeTextEditor?.document.uri.toString();
	if (uri)
	{
		let path = URI.parse(uri).fsPath;
		if (path)
		{
			return path.substring(0, path.lastIndexOf("\\"));
		}
	}
	return undefined;
}




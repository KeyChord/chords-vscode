import fs from "fs";
import path from "path";
import { tap } from "chord";
import spawn from "nano-spawn-compat";
//#region src/js/utils/file.ts
function exists(path) {
	try {
		fs.statSync(path);
		return true;
	} catch (err) {
		return false;
	}
}
//#endregion
//#region src/js/vscode.ts
const uid = await spawn("id", ["-u"]);
function vscode(cmd) {
	const tmp = process.env.TMPDIR ?? "/tmp";
	const dir = path.join(tmp, `vscode-command-server-${uid.stdout}`);
	if (!exists(dir)) return false;
	const requestPath = path.join(dir, "request.json");
	const responsePath = path.join(dir, "response.json");
	const payload = JSON.stringify({
		commandId: cmd,
		args: []
	});
	fs.writeFileSync(requestPath, payload);
	fs.rmSync(responsePath, { force: true });
	tap("cmd+shift+f17");
	return true;
}
//#endregion
export { vscode as default };

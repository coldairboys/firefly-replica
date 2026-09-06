import fs from "node:fs";

// 用法: node scripts/ensure-draft.js <文章编号>
// 将 src/content/posts/<N>.md 强制置为 draft: true，
// 让周刊自动生成的内容先以草稿形式提交，人工确认后手动改为 false 发布。
const num = process.argv[2];
if (!num) {
	console.error("Error: post number argument is required");
	process.exit(1);
}

const file = `src/content/posts/${num}.md`;
if (!fs.existsSync(file)) {
	console.error(`Error: ${file} does not exist`);
	process.exit(1);
}

let content = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
if (!frontmatter) {
	console.error(`Error: no frontmatter found in ${file}`);
	process.exit(1);
}

if (/^draft:\s*true\s*$/m.test(frontmatter)) {
	console.log(`${file} is already a draft, nothing to do`);
	process.exit(0);
}

if (/^draft:\s*false\s*$/m.test(frontmatter)) {
	console.warn(
		`Warning: ${file} was published (draft: false), flipping to draft`,
	);
	content = content.replace(/^draft:\s*false\s*$/m, "draft: true");
} else {
	content = content.replace(/^---\r?\n/, "---\ndraft: true\n");
}

fs.writeFileSync(file, content, "utf8");
console.log(`${file} marked as draft`);

const fs = require('fs');
const path = require('path');

const BGred = '\x1b[41m';
const reset = '\x1b[0m';
const green = '\x1b[32m';
const magenta = '\x1b[35m';

const Example = '1. fix: Fixed login issue';
const Example1 = '2. feat: Add new login feature';
const Example2 = '3. merge: Merge new login feature';
const Example3 = '3. update: Update login api';

function main() {
  const rootDir = process.cwd();
  const commitFilePath = path.join(rootDir, '.git', 'COMMIT_EDITMSG');
  const commitMessage = fs.readFileSync(commitFilePath, 'utf8');

  const regExp =
    /^(feature|feat|update|merge|fix|docs|style|refactor|test|chore|perf|build|ci|revert): ?[A-Z].*$|^Merge branch [^\n]+ into [^\n]+$/;

  console.log('commit_message:', commitMessage);
  const valid = regExp.test(commitMessage.trim());
  if (!valid) {
    console.log(BGred, "Aborting commit: the commit message doesn't comply with conventional commits standard.", reset);
    console.log(green, '\n Example: \n', Example, '\n', Example1, '\n', Example2, '\n', Example3, reset);
    process.exitCode = 1;
  } else {
    console.log(magenta, 'Your commit message is valid. 🚀🚀🚀 ', reset);
  }
}

main();

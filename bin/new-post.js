// eslint-disable-next-line import/no-extraneous-dependencies
const nunjucks = require("nunjucks");
const fs = require("fs");

function normalizeTitle(title) {
  return title.toLocaleLowerCase().replace(/ /g, "-");
}

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

async function saveFile(title, content) {
  const filePath = `./content/${formatDate(new Date())}-${normalizeTitle(
    title
  )}.md`;
  if (fs.existsSync(filePath)) throw new Error("File exists");

  fs.writeFileSync(filePath, content, "utf8");
}

async function main() {
  const title = process.argv[2];
  if (!title) {
    console.log("Usage: yarn new <post title>");
    return;
  }

  nunjucks.configure("bin", { autoescape: true });
  const result = nunjucks.render("post-template.md", {
    title,
    date: new Date().toISOString(),
  });

  await saveFile(title, result);
}

main();

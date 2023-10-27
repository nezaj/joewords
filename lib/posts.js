import fs from "fs";
import matter from "gray-matter";
import _ from "lodash";
import { marked } from "marked";
import * as ReactDOMServer from "react-dom/server";
import { Fence } from "../components";

import footnotes from "./footnotes";

marked.use({
  renderer: {
    code(code, language) {
      return ReactDOMServer.renderToString(
        <Fence code={code} language={language} />
      );
    },
    ...footnotes,
  },
});

function getPostBySlug(slug) {
  const file = fs.readFileSync(`./_posts/${slug}.md`, "utf-8");
  const { data, content } = matter(file);
  return {
    slug,
    ...data,
    content,
  };
}

function removeMdExtension(str) {
  return str.replace(/\.md$/, "");
}

export function getAllSlugs() {
  const dir = fs.readdirSync("./_posts");
  return dir.map((mdName) => removeMdExtension(mdName));
}

export function getHTMLPostBySlug(slug) {
  const p = getPostBySlug(slug);
  return {
    ..._.omit(p, "content"),
    mdHTML: marked(p.content),
  };
}

export function getAllPosts() {
  const posts = getAllSlugs().map((slug) => getPostBySlug(slug));
  return _.orderBy(posts, "date", "desc").map((p) => _.omit(p, "content"));
}

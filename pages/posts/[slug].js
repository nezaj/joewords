import format from "date-fns/format";
import parse from "date-fns/parse";
import Head from "next/head";
import { getAllSlugs, getHTMLPostBySlug } from "../../lib/posts";
import { Header } from "../../components";

function Prose({ html }) {
  return (
    <div
      className="prose mx-auto py-8 prose-h1:mt-8 prose-h1:mb-4 prose-h2:mt-4 prose-h2:mb-2"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}

const Post = ({ post }) => {
  const { title, date, mdHTML } = post;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Relational Database, on the client."
        />
      </Head>
      <Header showHome={true} />
      <div>
        <div className="mx-auto max-w-xl px-4">
          <div className="mb-4 space-y-2 border-b border-gray-300 py-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
              {format(parse(date, "yyyy-MM-dd", new Date()), "MMM do, yyyy")}
            </div>
          </div>
          <Prose html={mdHTML} />
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map((slug) => `/posts/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: { post: getHTMLPostBySlug(slug) },
  };
}

export default Post;

import format from "date-fns/format";
import parse from "date-fns/parse";
import Head from "next/head";
import { Header, TextLink } from "../components";
import { getAllPosts } from "../lib/posts";

const Posts = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>{`Joe's Words!`}</title>
        <meta name="description" content="Joe's Personal Blog." />
      </Head>
      <div>
        <Header />
        <div className="flex flex-col space-y-4">
          {posts.map(({ title, slug, date }) => {
            return (
              <div key={slug} className="w-[350px] mx-auto">
                <TextLink
                  href={`/posts/${slug}`}
                  className="flex-col space-y-2"
                >
                  <div className="text-xl font-bold">{title}</div>
                  <div className="text-sm font-bold uppercase text-gray-500">
                    {format(
                      parse(date, "yyyy-MM-dd", new Date()),
                      "MMM do, yyyy"
                    )}
                  </div>
                </TextLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { posts: getAllPosts() },
  };
}

export default Posts;

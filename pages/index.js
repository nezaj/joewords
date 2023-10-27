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
        <div className="flex justify-center items-center px-4">
          {posts.map(({ title, slug, date }) => {
            return (
              <div key={slug} className="flex justify-center items-center">
                <TextLink href={`/posts/${slug}`}>
                  <span className="text-sm sm:text-lg font-bold mr-4">
                    {title}
                  </span>
                  <span className="text-xs sm:text-md font-bold uppercase text-gray-500">
                    {format(
                      parse(date, "yyyy-MM-dd", new Date()),
                      "MMM do, yyyy"
                    )}
                  </span>
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

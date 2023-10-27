import format from "date-fns/format";
import parse from "date-fns/parse";
import Head from "next/head";
import { Header, TextLink } from "../components";
import { getAllPosts } from "../lib/posts";

const Posts = ({ posts }) => {
  return (
    <div>
      <Head>
        <meta name="description" content="Joe's Personal Blog." />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.joewords.com" />
        <meta property="og:title" content="Joe Averbukh's Blog" />
        <meta
          property="og:description"
          content="This is where I share my words"
        />
        <title>{`Joe's Words!`}</title>
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

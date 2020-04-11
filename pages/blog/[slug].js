import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import marked from 'marked';

const Post = ({ htmlString, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // Anyting put inside props: {} will be passed to Post
  const markdownWithMetaData = fs
    .readFileSync(path.join('posts', slug + '.md'))
    .toString();

  const parsedMarkdown = matter(markdownWithMetaData);
  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data
    }
  };
};

export default Post;

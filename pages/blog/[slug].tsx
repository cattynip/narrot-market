import { readdirSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import { unified } from 'unified';

interface BlogSlugProps {
  post: string;
}

const BlogSlug: NextPage<BlogSlugProps> = ({ post }) => {
  return <div>{post}</div>;
};

// This is for informing how many paths the [slug] can be.
// Because this page is generating the same page(that is also why it is called "Static")
export const getStaticPaths: GetStaticPaths = () => {
  const files = readdirSync('./posts').map(file => {
    const [name] = file.split('.');
    return { params: { slug: name } };
  });

  console.log(files);

  return {
    paths: files,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      post: value
    }
  };
};

export default BlogSlug;

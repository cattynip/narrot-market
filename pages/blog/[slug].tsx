import PageLayout from '@components/PageLayout';
import { readdirSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import { unified } from 'unified';

interface BlogSlugProps {
  post: string;
  title: string;
}

const BlogSlug: NextPage<BlogSlugProps> = ({ post, title }) => {
  return (
    <PageLayout title={title}>
      <div className="blog-post" dangerouslySetInnerHTML={{ __html: post }} />
    </PageLayout>
  );
};

// This is for informing how many paths the [slug] can be.
// Because this page is generating the same page(that is also why it is called "Static")
export const getStaticPaths: GetStaticPaths = () => {
  const files = readdirSync('./posts').map(file => {
    const [name] = file.split('.');
    return { params: { slug: name } };
  });

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
      post: value,
      title: data?.title
    }
  };
};

export default BlogSlug;

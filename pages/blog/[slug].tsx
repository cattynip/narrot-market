import PageLayout from '@components/PageLayout';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import { unified } from 'unified';

interface BlogSlugProps {
  post: string;
  title: string;
}

const BlogSlug: NextPage<BlogSlugProps> = ({ post, title }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <PageLayout title={'Data fetching..'}>
        <span>We are calling the data.</span>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={title}>
      <div className="blog-post" dangerouslySetInnerHTML={{ __html: post }} />
    </PageLayout>
  );
};

// This is for informing how many paths the [slug] can be.
// Because this page is generating the same page(that is also why it is called "Static")
export const getStaticPaths: GetStaticPaths = () => {
  // const files = readdirSync('./posts').map(file => {
  //   const [name] = file.split('.');
  //   return { params: { slug: name } };
  // });

  // If fallback is true, it will work same as fallback "blocking",
  // but it can show something, unlikely to blocking.
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);

  console.log('Hello?');

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

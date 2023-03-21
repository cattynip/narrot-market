import PageLayout from '@components/PageLayout';
import { readdirSync, readFileSync } from 'fs';
import grayMatter from 'gray-matter';
import { NextPage } from 'next';
import Link from 'next/link';

interface IPost {
  title: string;
  date: string;
  category: string[];
  content: string;
  file: string;
  slug: string;
}

const Blog: NextPage<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <PageLayout title="Blog">
      {posts.map(post => (
        <Link key={post.title} href={`/blog/${post.slug}`}>
          <div>
            <h2>{post.title}</h2>
            <div>
              {post.category.map(ctg => (
                <p key={ctg}>{ctg}</p>
              ))}
            </div>
            <p>This post was written on {post.date}</p>
          </div>
        </Link>
      ))}
    </PageLayout>
  );
};

export async function getStaticProps() {
  const blogPost = readdirSync('./posts').map(file => {
    const content = readFileSync(`./posts/${file}`, 'utf-8');
    const [slug] = file.split('.');
    return { ...grayMatter(content).data, file, slug };
  });

  return {
    props: {
      posts: blogPost
    }
  };
}

export default Blog;

import { readdirSync } from 'fs';
import { NextPage } from 'next';

const BlogSlug: NextPage = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
};

// This is for informing how many paths the [slug] can be.
// Because this page is generating the same page(that is also why it is called "Static")
export function getStaticPaths() {
  const files = readdirSync('./posts').map(file => {
    const [name] = file.split('.');
    return { params: { slug: name } };
  });

  console.log(files);

  return {
    paths: files,
    fallback: false
  };
}

export function getStaticProps() {
  return {
    props: {}
  };
}

export default BlogSlug;

import Link from 'next/link';
import fs from 'fs';

const Home = ({ slugs }) => {
  return (
    <div>
      {slugs.map((slug) => (
        <div key={slug}>
          <Link href={'blog/' + slug}>
            <a>{'blog/' + slug}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync('posts');
  const slugs = files.map((file) => file.replace('.md', ''));

  return {
    props: {
      slugs
    }
  };
};

export default Home;

import dynamic from "next/dynamic";
import PropTypes from 'prop-types';

const LayoutComponent = dynamic(() => import('@/layout'), {
  loading: () => <p>Loading...</p>,
})

export default function Posts({ posts }) {
  
  return (
    <LayoutComponent metaTitle="Posts" metaDescription="All contents belong to Posts">
      <p className="background-orange">Posts</p>
      {posts.map(post => (
        <ul key={post.id} style={{ border: "1px solid black", width: "100%"}}>
          <li>id: {post.id}</li>
          <li>{`title: ${post.title}`}</li>
          <li>{`body: ${post.body}`}</li>
        </ul>
      ))}
    </LayoutComponent>
  );
};

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return { props: { posts } }
};

Posts.propTypes = {
  posts: PropTypes.array,
};
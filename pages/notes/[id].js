import dynamic from "next/dynamic";
import PropTypes from 'prop-types';

const LayoutComponent = dynamic(() => import('@/layout'), {
  loading: () => <p>Loading...</p>,
})

export default function DetailNotes({ note }) {
  
  return (
    <LayoutComponent metaTitle="Detail Notes" metaDescription="All contents belong to Detail Notes">
      <p className="background-orange">Detail Notes</p>
      <p>id: {note.data.id}</p>
      <p>{`title: ${note.data.title}`}</p>
      <p>{`description: ${note.data.description}`}</p>
    </LayoutComponent>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes');
  const notes = await res.json();

  const paths = notes.data.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`);
  const note = await res.json();
  return { props: { note }, revalidate: 10 }
};

DetailNotes.propTypes = {
  note: PropTypes.object,
};
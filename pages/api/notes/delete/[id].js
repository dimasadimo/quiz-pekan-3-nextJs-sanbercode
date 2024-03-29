export default async function handler(req, res) {
  const { query } = req;

  try { 
    const response = await (await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${query.id}`, {
      method: 'DELETE'
    })).json();
    res.status(200).json({ ...response });
  } catch (e) { 
    res.status(500).json({ error: 'Error API' });
  }
}
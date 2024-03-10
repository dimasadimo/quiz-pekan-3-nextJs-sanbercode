// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try { 
    const response = await (await fetch('https://dummyjson.com/users?limit=10')).json();
    res.status(200).json({ ...response });
  } catch (e) { }
}

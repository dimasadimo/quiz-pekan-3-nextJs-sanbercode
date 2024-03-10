import Layout from "@/layout";
import { useEffect, useState } from "react";


export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await (await fetch('/api/hello')).json();
      console.log(response);
      setUsers(response.users);
    };
    getUsers();
  });

  return (
    <Layout metaTitle="User" metaDescription="All contents belong to User">
      <p className="background-orange">User</p>
      {users?.map(user => (
        <ul key={user.id} style={{ border: "1px solid black", width: "100%"}}>
          <li>id: {user.id}</li>
          <li>{`name: ${user.firstName} ${user.lastName}`}</li>
        </ul>
      ))}
    </Layout>
  );
}
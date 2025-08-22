export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // You can fetch user from your DB here
  // const user = await getUserById(id);

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
}

import Title from "@/ui/Title";

export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // You can fetch user from your DB here
  // const user = await getUserById(id);

  return (
    <div>
      <Title>User Page</Title>
      <p>User ID: {id}</p>
    </div>
  );
}

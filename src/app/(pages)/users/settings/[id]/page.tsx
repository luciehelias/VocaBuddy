import Title from "@/components/ui/Title";

// This runs on the server by default
export default async function UserSettingsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // You can fetch user from your DB here
  // const user = await getUserById(id);

  return (
    <div>
      <Title>User Settings Page</Title>
      <p>User ID: {id}</p>
    </div>
  );
}

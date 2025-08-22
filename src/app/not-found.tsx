import Title from "@/ui/Title";

export default function Custom404() {
  return (
    <div className="gap-6 flex flex-col items-center justify-center">
      <Title variant="lg">404 - Page Not Found</Title>
      <p className="text-lg">The page you are looking for does not exist.</p>
    </div>
  );
}

import { Button } from "@/shared/ui";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold">Velvet Secrets Engine</h1>
      <div className="mt-6">
        <Button>Explore Collection</Button>
      </div>
    </main>
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Product ID: {id}</h1>
    </main>
  );
}

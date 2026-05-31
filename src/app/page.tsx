import { Button } from "@/shared/ui";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
        Velvet Secrets
      </h1>

      <p className="mt-4 text-base text-muted-foreground max-w-sm tracking-normal">
        Ексклюзивна колекція преміальної білизни. Синхронізовано з
        дизайн-системою Figma.
      </p>

      <div className="mt-8 flex gap-4">
        <Button className="bg-primary text-primary-foreground hover:bg-accent px-8 py-6 text-sm uppercase tracking-wider font-semibold transition-colors duration-200">
          Дивитись каталог
        </Button>

        <Button
          variant="outline"
          className="border-accent text-accent hover:bg-secondary px-8 py-6 text-sm uppercase tracking-wider font-semibold transition-colors duration-200"
        >
          У кошик
        </Button>
      </div>
    </main>
  );
}

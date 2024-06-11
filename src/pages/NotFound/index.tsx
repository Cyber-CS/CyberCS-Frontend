import { Link } from "~/components";

export default function NotFoundPage() {
  return (
    <main className="bg-gray-700 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48 items-center py-72">
        <div className="flex flex-col gap-24 items-center">
          <h1 className="text-48 font-bold">404</h1>
          <span className="text-24">Ops! Parece que você se perdeu.</span>
          <p className="text-24 text-center">Página não encontrada.</p>
          <Link to="/" className="text-20 underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}

export { NotFoundPage as Component };

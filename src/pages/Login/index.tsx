import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  
  return (
    <main className="bg-gray-150 flex-1 text-white w-full flex">
      <section className="container flex flex-col gap-32 items-center justify-center py-72">
        <div className="w-full max-w-384 bg-gray-400 px-12 py-24 rounded-40">
          <LoginForm />
          <p className="mt-24 w-full  text-center font-bold text-14">
            Caso não possua acesso, contate o administrador da sua empresa.
          </p>
        </div>
      </section>
    </main>
  );
}

export const Loading = () => {
  return (
    <main className="bg-gray-700 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48 items-center py-72">
        <div className="flex flex-col gap-24 items-center">
          <h1 className="text-48 font-bold">Carregando</h1>
          <span className="text-24">Aguarde um momento</span>
        </div>
      </div>
    </main>
  );
};

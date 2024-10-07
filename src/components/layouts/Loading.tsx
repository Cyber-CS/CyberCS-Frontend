import { cx } from "class-variance-authority";

export const Loading = () => {
  return (
    <div
      className={cx([
        "fixed inset-0 z-50",
        "bg-black/70 backdrop-blur-[1px]",
        "data-[state=closed]:animate-popOut",
      ])}
    >
      <div
        className={cx([
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "z-[100] p-32 rounded-12",
        ])}
      >
        <div className="flex flex-col items-center p-24 rounded-48">
          <h1 className="text-48 font-bold text-white">Carregando</h1>
          <span className="text-20 -mt-8 font-semibold text-white mb-8">
            Aguarde um momento
          </span>
          <div className="w-48 h-48 rounded-full animate-spin border-y border-solid border-white border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};

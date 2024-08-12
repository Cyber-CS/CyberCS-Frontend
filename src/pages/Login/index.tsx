import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="bg-gray-150 flex-1 text-white w-full flex">
      <section className="container flex flex-col gap-32 items-center justify-center py-72 relative overflow-hidden">
        <BgEffect />
        <div className="w-full max-w-384 bg-gray-400 px-12 py-24 rounded-40 z-50">
          <LoginForm />
          <p className="mt-24 w-full  text-center font-bold text-14">
            Caso não possua acesso, contate o administrador da sua empresa.
          </p>
        </div>
      </section>
    </main>
  );
}

const BgEffect = () => (
  <ul className="absolute inset-0 w-full h-full list-none z-10">
    <li className="absolute w-[10rem] h-[10rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_15s_linear_infinite] delay-1000ms left-[10%]"></li>
    <li className="absolute w-[3.5rem] h-[3.5rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_15s_linear_infinite] delay-[4s] left-[20%]"></li>
    <li className="absolute w-[5rem] h-[5rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_12s_linear_infinite] delay-[3s] left-[28%]"></li>
    <li className="absolute w-[4.5rem] h-[4.5rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_10s_linear_infinite] delay-[7s] left-[35%]"></li>
    <li className="absolute w-[6.5rem] h-[6.5rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_9s_linear_infinite] delay-[1s] left-[43%]"></li>
    <li className="absolute w-[10rem] h-[10rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_8s_linear_infinite] delay-[0s] left-[50%]"></li>
    <li className="absolute w-[7rem] h-[7rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_13s_linear_infinite] delay-[3s] left-[60%]"></li>
    <li className="absolute w-[6rem] h-[6rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_20s_linear_infinite] delay-[1s] left-[70%]"></li>
    <li className="absolute w-[7.5rem] h-[7.5rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_16s_linear_infinite] delay-[5s] left-[77%]"></li>
    <li className="absolute w-[9rem] h-[9rem] bg-gradient-to-l from-[#6b6d79] to-[#30313a] opacity-50 -bottom-[300px] animate-[anim_19s_linear_infinite] delay-[3s] left-[85%]"></li>
  </ul>
);

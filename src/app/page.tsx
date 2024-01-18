import Image from "next/image";
import { Nunito } from "next/font/google";
import Link from "next/link";
const nunito = Nunito({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 {nunito.className}">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 items-center flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-white">
          Get started by{" "}
          <Link
            href="/signup"
            className="bg-orange-500 py-[5px] px-[10px] rounded-3xl ml-2"
          >
            {" "}
            SignUp
          </Link>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={300}
          height={80}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left  gap-10 rounded-2xl">
        <Link
          href="/login"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-orange-600 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-orange-700"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-bold text-white`}>
            LogIn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-md opacity-50 text`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>
        <Link
          href="/profile"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-orange-600 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-orange-700"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-bold text-white`}>
            Profile{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-md opacity-50 text`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>

        <Link
          href="/logout"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-orange-600 hover:border-gray-300 hover:bg-bg-orange-600 hover:dark:border-neutral-700 hover:dark:bg-orange-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-bold text-white`}>
            Logout{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-md opacity-50 text`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>
        <Link
          href="https://github.com/meet2aman"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-black hover:border-gray-300 hover:bg-bg-orange-600 hover:dark:border-neutral-700 hover:dark:bg-slate-900"
          rel="noopener noreferrer"
          target="_blank"
        >
          <h2
            className={`mb-3 text-2xl text-center font-bold text-orange-500 uppercase`}
          >
            Aman Kushwaha{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p
            className={`m-0 max-w-[30ch] text-md opacity-50 text-gray-400 text-center`}
          >
            A Full Stack Developer And Enginner
          </p>
        </Link>
      </div>
    </main>
  );
}

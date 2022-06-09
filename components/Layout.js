import GithubIcon from './GithubIcon'
import Image from 'next/image'

function Layout({ children }) {
  return (
    <div
      className="h-screen flex flex-col"
      style="height:-webkit-fill-available;"
    >
      <header className="flex-none bg-gray-700 p-4 md:px-8 py-2 flex justify-between align-middle">
        <div className="flex gap-2 items-center">
          <Image alt="Walkthru" src="/logo.png" width={25} height={25} />
          <h1 className="text-white text-lg font-bold leading-none">
            WalkThru
          </h1>
        </div>
        <a
          target="_blank"
          href="https://github.com/walkthru/next"
          rel="noreferrer"
        >
          <GithubIcon className="fill-white h-6 w-6" />
        </a>
      </header>
      <div className="overflow-hidden p-4 md:p-8 bg-gray-50 flex-auto">
        {children}
      </div>
      <footer className="flex-none bg-gray-200 py-2">
        <div className="text-center text-xs text-gray-500">
          WalkThru &copy; 2022
        </div>
      </footer>
    </div>
  )
}

export default Layout

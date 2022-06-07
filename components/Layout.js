import GithubIcon from "./GithubIcon";

function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex-none bg-gray-700 px-8 py-2 flex justify-between align-middle">
        <h1 className="text-white text-lg font-bold">
          WalkThru Demo
        </h1>
        <a target="_blank" href="https://github.com/walkthru/next">
          <GithubIcon className="fill-white h-6 w-6" />
        </a>
      </header>
      <div className="overflow-hidden p-4 md:p-8 bg-gray-50 flex-auto">
        {children}
      </div>
      <footer className="flex-none bg-gray-200 py-2">
        <div className="text-center text-xs text-gray-500">
          WalkThru Next Demo &copy; 2022
        </div>
      </footer>
    </div>
  )
}

export default Layout

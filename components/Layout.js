function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex-none bg-gray-700 px-8">
        <h1 className="text-white text-lg py-2 font-bold">
          WalkThru Next Demo
        </h1>
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

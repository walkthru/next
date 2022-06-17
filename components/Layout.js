import { useEffect, useRef } from 'react'

function Layout({ children }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    function preventDefault(e) {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    el.addEventListener('touchstart', preventDefault, { passive: false })
    el.addEventListener('touchmove', preventDefault, { passive: false })
  }, [])
  return (
    <div className="flex flex-col h-screen h-screen-ios min-h-screen-ios">
      <header className="flex-none bg-gray-700 p-4 md:px-8 py-2 flex justify-between align-middle">
        <div className="flex gap-2 items-center">
          <img alt="Walkthru" src="/logo.png" width="25" height="25" />
          <h1 className="text-white text-lg font-bold leading-none">
            WalkThru
          </h1>
        </div>
      </header>
      <div className="overflow-hidden p-4 md:p-8 bg-gray-50 flex-auto flex">
        {children}
      </div>
      <footer className="flex-none bg-gray-200 py-2 flex justify-center align-middle gap-4">
        <p className="text-center text-xs text-gray-500">
          <span className="font-bold">Walkthru &copy; 2022.</span>
          <a
            ref={ref}
            className="underline ml-2"
            target="_blank"
            href="https://github.com/walkthru/walkthru"
            rel="noreferrer"
          >
            Source on GitHub.
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Layout

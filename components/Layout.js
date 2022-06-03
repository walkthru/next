function Layout({ children }) {
  return (
    <div className="bg-stone-50 h-screen flex flex-col">
      <header className="flex-none">Header</header>
      <div className="overflow-hidden">{ children }</div>
      <footer className="flex-none">Footer</footer>
    </div>
  )
}

export default Layout

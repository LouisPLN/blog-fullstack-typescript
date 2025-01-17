import Navbar from "@/components/Navigation/NavBar"


const Header = () => {
  return (
    <header className="bg-background/75 backdrop-blur border-b h-16 border-gray-200 dark:border-gray-800 sticky top-0 z-0">
      <Navbar />
    </header>
  )
}

export default Header
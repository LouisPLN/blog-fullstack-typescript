import ToggleThemeButton from "../Button/ToggleThemeButton"
import Navbar from "@/components/Navigation/NavBar"


const Header = () => {
  return (
    <header>
      <Navbar />
        <ToggleThemeButton />
    </header>
  )
}

export default Header
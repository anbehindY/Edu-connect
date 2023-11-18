import NavBarRoutes from "@/components/NavbarRoutes";
import MobileNav from "./MobileNav";

const NavBar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileNav />
      <NavBarRoutes />
    </div>
  );
}

export default NavBar;

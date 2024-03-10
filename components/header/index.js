import Menu from "@/components/menu";
import withAuth from "../with-auth";

const Header = () => {
  return (
    <Menu />
  )
}

export default withAuth(Header);
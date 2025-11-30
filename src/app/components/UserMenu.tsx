import { User } from "../ui/Icons";
import { Link } from "../ui/Link";
import { Menu, MenuContent, MenuTrigger } from "../ui/Menu";

export function UserMenu() {
  return (
    <Menu position="bottomRight">
      <MenuTrigger variant="ghost">
        <User />
      </MenuTrigger>
      <MenuContent>
        <ul>
          <li>
            <Link href="/login" variant="ghost">
              Logout
            </Link>
          </li>
        </ul>
      </MenuContent>
    </Menu>
  );
}

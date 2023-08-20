import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Logo from "./Logo";

const links = [{ href: "/track", label: "Track" }];

export async function NavBar() {
  const user = await getUserSession();
  return (
    <div className="shadow">
      <div className="container mx-auto flex items-center space-x-4 py-2">
        <Logo />
        <nav>
          <ul>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="rounded px-2 py-1 text-blue-500 hover:bg-slate-100 hover:text-blue-600"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="flex-grow" />
        <div>
          {user && (
            <Avatar>
              {user.image ? (
                <AvatarImage src={user.image} referrerPolicy="no-referrer" />
              ) : (
                <AvatarFallback>{user.name}</AvatarFallback>
              )}
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
}

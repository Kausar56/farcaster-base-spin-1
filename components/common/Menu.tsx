import {
  LucideIcon,
  TrendingUp,
  UserIcon,
  FerrisWheel,
  Shield,
  Ticket,
} from "lucide-react";
import { RouteUnion, useFrame } from "../farcaster-provider";
type MenuButton = {
  name: string;
  Icon: LucideIcon;
  route: RouteUnion;
};

const menus: MenuButton[] = [
  {
    name: "Lottery",
    Icon: Ticket,
    route: "lottery",
  },
  {
    name: "Spin",
    Icon: FerrisWheel,
    route: "spin",
  },
  {
    name: "Leaderboard",
    Icon: TrendingUp,
    route: "leaderboard",
  },
  {
    name: "Profile",
    Icon: UserIcon,
    route: "profile",
  },
];

function MenuButton({ name, Icon, route }: MenuButton) {
  const { setRoute } = useFrame();

  return (
    <button
      onClick={() => setRoute(route)}
      className=" flex flex-col items-center justify-center gap-1 flex-1 py-2"
    >
      <Icon
        className="bg-gradient-to-b from-blue-50 to-blue-100 text-blue-600 shadow-md backdrop-blur-md p-1 h-9 w-9 rounded-md transform hover:scale-[1.1] duration-300"
        size={24}
      />
      <span className="text-xs text-white">{name}</span>
    </button>
  );
}

export function Menu() {
  const { context } = useFrame();
  return (
    <nav className="w-full fixed z-50 bottom-0 left-0">
      <div className="flex justify-between bg-gradient-to-r from-blue-600 to-blue-500  shadow-md  rounded-t-3xl">
        {menus.map((menu) => (
          <MenuButton
            key={menu.route}
            name={menu.name}
            Icon={menu.Icon}
            route={menu.route}
          />
        ))}
        {(context &&
          context?.user?.username === process.env.NEXT_PUBLIC_ADMIN_ACCOUNT) ||
          (context?.user?.username === "sukanto01899" && (
            <MenuButton key="436" name="Admin" Icon={Shield} route="admin" />
          ))}
      </div>
    </nav>
  );
}

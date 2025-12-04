import Link from "next/link";
import { NavItem } from "../types";

interface RecursiveNavItemProps {
    item: NavItem;
    depth?: number;
}

export const RecursiveNavItem = ({ item, depth = 0 }: RecursiveNavItemProps) => {
    return (
        <li className={`relative px-4 py-2 cursor-pointer hover:[&>ul]:block
            ${depth === 0 ? "hover:bg-gray-800" : "hover:bg-gray-100"}
        `}>
            <Link href={item.href} className="block w-full h-full">
                <div className="flex justify-between items-center">
                    <span className={`${depth === 0 ? "text-white" : "text-black"}`}>{item.name}</span>
                    {item.subMenu && item.subMenu.length > 0 && (
                        <span className={`ml-2 text-xs ${depth === 0 ? "text-white" : "text-black"}`}>▶</span>
                    )}
                </div>
            </Link>
            {item.subMenu && item.subMenu.length > 0 && (
                <ul
                    className={`absolute hidden bg-white shadow-lg rounded-md min-w-[200px] z-50
                    ${depth === 0 ? "top-full left-0" : "top-0 left-full"}
                    `}
                >
                    {item.subMenu.map((subItem) => (
                        <RecursiveNavItem key={subItem.id} item={subItem} depth={depth + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
};

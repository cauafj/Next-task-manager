'use client'

import Link from "next/link"
import { link } from "../lib/definitions"
import { FaceSmileIcon } from "@heroicons/react/24/solid"
import {ChevronDownIcon} from "@heroicons/react/24/solid"
import { usePathname } from "next/navigation"


const Navbar = ({links}: {links: link[]}) => {
    const pathname = usePathname()

    return (
        <div className="flex flex-row h-10 items-center gap-x-10 p-10 justify-between bg-gray border-blue border rounded-md">
            <FaceSmileIcon className="w-6"/>
            <div className="flex flex-row gap-x-10">
                {links.map(link => (
                    <Link href={link.href} key={link.text}>
                        <p className={`font-bold text-xl ${link.href === pathname && 'underline decoration-blue decoration-2'}`}>{link.text}</p>
                    </Link>
                ))}
            </div>
            <button className="flex flex-row items-center bg-blue p-2 rounded-md">
                <p>Login</p>
                <ChevronDownIcon className="w-3" />
            </button>
        </div>
    )
}

export default Navbar
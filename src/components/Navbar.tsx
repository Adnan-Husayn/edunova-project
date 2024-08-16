'use client'
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FC } from 'react'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {
    return (
        <nav className="flex items-center justify-between outline outline-gray-200 p-6">
            <div className="text-blue-800 text-4xl font-bold">
                <Link href="/">PEOPLE.CO</Link>
            </div>
            <div className="flex items-center space-x-4">
                <button className="">
                    <BellIcon className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-2">
                    <UserCircleIcon className="w-10 h-10" />
                    <span className="">John Doe</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
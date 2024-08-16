// Sidebar.tsx
'use client'
import { FC } from 'react'
import Link from 'next/link'
import { Squares2X2Icon } from '@heroicons/react/24/solid'

interface SidebarProps { }

const Sidebar: FC<SidebarProps> = ({ }) => {
    return (
        <div>
            <aside className="w-64 h-screen p-4 mt-2">
                <ul className="space-y-2">
                    <li>
                        <Link href="/">
                            <div className="flex p-2 rounded hover:bg-gray-200">
                                <Squares2X2Icon className='w-4 h-4 m-1' />
                                Dashboard
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/people-directory">
                            <div className="flex p-2 rounded hover:bg-gray-200">
                                <Squares2X2Icon className='w-4 h-4 m-1' />
                                People Directory
                            </div>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar

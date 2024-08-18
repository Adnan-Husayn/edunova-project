'use client'
import { FC, useState } from 'react';
import {
    createColumnHelper, flexRender, getCoreRowModel, useReactTable,
    getFilteredRowModel, getSortedRowModel, getPaginationRowModel, PaginationState
} from '@tanstack/react-table';
import { generateFakeData, generateUniqueId } from '@/lib/utils';
import EditMemberModal from './EditMemberModal';
import AddMemberModal from './AddMemberModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Data } from '@/lib/types';
import MemberDetails from './MemberDetails';
import Image from 'next/image';

interface TableProps { }

const USERS: Data[] = generateFakeData(100);

const Table: FC<TableProps> = ({ }) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
    const [isEditMemberModalOpen, setEditMemberModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Data | null>(null);
    const [data, setData] = useState<Data[]>(() => [...USERS]);

    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

    const columnHelper = createColumnHelper<Data>();

    const handleEditMember = (updatedMember: Partial<Data>) => {
        if (selectedPerson) {
            const updatedData = { ...selectedPerson, ...updatedMember };
            setData(prev => prev.map(m => m.id === updatedData.id ? updatedData : m));
        }
        setEditMemberModalOpen(false);
    };


    const handleAddMember = (member: Omit<Data, 'id' | 'avatar' | 'username'>) => {
        const newMember: Data = {
            id: generateUniqueId(),
            avatar: '',
            username: '',
            ...member,
            team: member.team || []
        };
        setData(prev => [...prev, newMember]);
        setAddMemberModalOpen(false);
    };

    const handleDelete = (person: Data) => {
        setData(data.filter(item => item.id !== person.id));
    };

    const columns = [
        columnHelper.accessor('avatar', {
            cell: (info) => (
                <Image
                    src={info.getValue() || '/default-avatar.png'}
                    alt='Avatar'
                    className='rounded-full w-10 h-10 object-cover'
                    width={40}
                    height={40}
                />
            ),
            header: '',
        }),

        columnHelper.accessor('name', {
            cell: (info) => (
                <div className="flex items-left flex-col">
                    <span className="font-medium">{info.getValue()}</span>
                    <span className="text-sm text-gray-500">@{info.row.original.username}</span>
                </div>
            ),
            header: 'Name',
            enableSorting: true,
        }),
        columnHelper.accessor('status', {
            cell: (info) => (
                <div className="flex items-center border border-gray-300 p-1 rounded-md">
                    <span className={`h-2 w-2 rounded-full ${info.getValue() ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="ml-2 text-xs">{info.getValue() ? 'Active' : 'Inactive'}</span>
                </div>
            ),
            header: 'Status',
            enableSorting: true,
        }),
        columnHelper.accessor('role', {
            cell: (info) => (
                <span className='text-sm font-medium'>{info.getValue()}</span>
            ),
            header: 'Role',
            enableSorting: false
        }),
        columnHelper.accessor('email', {
            cell: (info) => (
                <span className='text-sm text-gray-500'>{info.getValue()}</span>
            ),
            header: 'Email address',
            enableSorting: false
        }),
        columnHelper.accessor('team', {
            cell: (info) => {
                const teams = info.getValue();
                return (
                    <div className="flex flex-wrap gap-2">
                        {teams.slice(0, 3).map((team: string, idx: number) => (
                            <span key={idx} className='bg-blue-50 border text-blue-600 text-xs px-2 py-1 rounded-full'>
                                {team}
                            </span>
                        ))}
                        {teams.length > 3 && (
                            <span className='bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full'>
                                +{teams.length - 3}
                            </span>
                        )}
                    </div>
                );
            },
            header: 'Teams',
            enableSorting: false
        }),
        columnHelper.display({
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex space-x-5">
                    <button
                        onClick={() => {
                            setSelectedPerson(row.original);
                            setEditMemberModalOpen(true);
                        }}
                        className='text-gray-500 hover:text-blue-600'
                    >
                        <PencilIcon className='w-5 h-5' />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original)}
                        className='text-gray-500 hover:text-red-600'
                    >
                        <TrashIcon className='w-5 h-5' />
                    </button>
                </div>
            ),
        })
    ];

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, pagination },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="flex">
            <div className="w-full">
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center space-x-2'>
                        <h2 className='text-lg font-semibold'>Team members</h2>
                        <h2 className='bg-blue-50 border text-blue-600 text-sm px-2 py-1 rounded-full'>{data.length} users</h2>
                    </div>
                    <div className='flex items-center'>
                        <input
                            type='text'
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder='Search...'
                            className='border border-gray-300 p-2 rounded-md'
                        />
                        <button
                            onClick={() => setAddMemberModalOpen(true)}
                            className='bg-blue-600 text-white px-4 py-2 rounded-md ml-4'
                        >
                            Add Member
                        </button>
                    </div>
                </div>
                <div className='overflow-auto rounded-lg shadow'>
                    <table className='w-full'>
                        <thead className='bg-gray-50 border-b-2 border-gray-200'>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className='p-3 text-sm font-semibold tracking-wide text-left'>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    onClick={() => setSelectedPerson(row.original)}
                                    className='cursor-pointer hover:bg-gray-200'
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className='bg-blue-600 text-white px-4 py-2 rounded-md'
                    >
                        Previous
                    </button>
                    <span className='text-sm text-gray-700'>
                        Page <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className='bg-blue-600 text-white px-4 py-2 rounded-md'
                    >
                        Next
                    </button>
                </div>
            </div>
            <EditMemberModal
                isOpen={isEditMemberModalOpen}
                onClose={() => setEditMemberModalOpen(false)}
                member={selectedPerson}
                onEditMember={handleEditMember} // Updated prop name
            />

            <AddMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setAddMemberModalOpen(false)}
                onAddMember={handleAddMember} // Ensure this matches the expected type
            />

            {selectedPerson && (
                <MemberDetails
                    member={selectedPerson}
                    onClose={() => setSelectedPerson(null)}
                />
            )}
        </div>
    );
};

export default Table;

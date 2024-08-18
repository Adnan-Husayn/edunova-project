// components/PeopleTable.tsx
'use client'

import { generateFakeData } from '@/lib/utils';
import { PersonValidator } from '@/lib/validators/person';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { faker } from '@faker-js/faker';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const fallbackData = generateFakeData(100);

type FormData = {
  id?: string;
  name: string;
  role: string;
  team: string[];
  email: string;
  avatar?: string;
  username?: string;
  status?: boolean;
  dob?: Date;
  nationality?: string;
  contact?: string;
  research?: string;
};

interface PeopleTableProps {}

const PeopleTable:FC<PeopleTableProps> = () => {
  const [selectedRow, setSelectedRow] = useState<FormData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState(fallbackData);

  const { register, handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(PersonValidator),
  });

  const router = useRouter();

  const columnHelper = createColumnHelper<typeof fallbackData[0]>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
      header: () => 'Role',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('team', {
      header: () => 'Team',
      cell: info => info.getValue().join(', '),
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      cell: info => (
        <>
          <button onClick={() => handleDeleteMember(info.row.original.id)}><TrashIcon className='w-5 h-5' /></button>
          <button onClick={() => handleEditMember(info.row.original)}><PencilIcon className='w-5 h-5' /></button>
        </>
      ),
    }),
  ];
  const filteredData = data.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole ? item.role === filterRole : true;
    const matchesTeam = filterTeam ? item.team.some(t => filterTeam.includes(t)) : true;
    return matchesQuery && matchesRole && matchesTeam;
  });  

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    router.push(`/people?query=${e.target.value}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'role') setFilterRole(value);
    if (name === 'team') setFilterTeam(value);
  };

  const handleAddMember: SubmitHandler<FormData> = data => {
    const newMember = {
      id: faker.string.uuid(),
      avatar: '', // or appropriate default values
      username: '',
      status: false,
      dob: new Date(),
      nationality: '',
      contact: '',
      research: '',
      ...data,
    };
    setData(prev => [...prev, newMember]);
    reset();
  };

  const handleEditMember = (row: FormData) => {
    setSelectedRow(row);
  };

  const handleUpdateMember: SubmitHandler<FormData> = data => {
    if (selectedRow) {
      setData(prev => prev.map(item => (item.id === selectedRow.id ? { ...item, ...data } : item)));
      setSelectedRow(null);
      reset();
    }
  };

  const handleDeleteMember = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleRowClick = (row: FormData) => {
    setSelectedRow(row);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded"
        />
        <select name="role" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded ml-2">
          <option value="">Filter by role</option>
          <option value="Developer">Developer</option>
          <option value="Manager">Manager</option>
          {/* Add more roles as needed */}
        </select>
        <select name="team" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded ml-2">
          <option value="">Filter by team</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          {/* Add more teams as needed */}
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-3 text-left">
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original)}
              className="cursor-pointer"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h3>Add New Member</h3>
        <form onSubmit={handleSubmit(handleAddMember)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} placeholder="Name" className="p-2 border border-gray-300 rounded" />}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => <input {...field} placeholder="Role" className="p-2 border border-gray-300 rounded" />}
          />
          <Controller
            name="team"
            control={control}
            render={({ field }) => <input {...field} placeholder="Team" className="p-2 border border-gray-300 rounded" />}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} placeholder="Email" className="p-2 border border-gray-300 rounded" />}
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Member</button>
        </form>
      </div>

      {selectedRow && (
        <div className="mt-4">
          <h3>Edit Member</h3>
          <form onSubmit={handleSubmit(handleUpdateMember)} className="space-y-4">
            <Controller
              name="name"
              control={control}
              defaultValue={selectedRow.name}
              render={({ field }) => <input {...field} placeholder="Name" className="p-2 border border-gray-300 rounded" />}
            />
            <Controller
              name="role"
              control={control}
              defaultValue={selectedRow.role}
              render={({ field }) => <input {...field} placeholder="Role" className="p-2 border border-gray-300 rounded" />}
            />
            <Controller
              name="team"
              control={control}
              defaultValue={selectedRow.team}
              render={({ field }) => <input {...field} placeholder="Team" className="p-2 border border-gray-300 rounded" />}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={selectedRow.email}
              render={({ field }) => <input {...field} placeholder="Email" className="p-2 border border-gray-300 rounded" />}
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Update Member</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PeopleTable;

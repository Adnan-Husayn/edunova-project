import React, { useState, useEffect } from 'react';
import { EditMemberModalProps } from '@/lib/types';

const EditMemberModal: React.FC<EditMemberModalProps> = ({ isOpen, onClose, member, onEditMember }) => {
    const [name, setName] = useState(member?.name || '');
    const [status, setStatus] = useState(member?.status || false);
    const [role, setRole] = useState(member?.role || '');
    const [email, setEmail] = useState(member?.email || '');
    const [team, setTeam] = useState<string[]>(member?.team || []);

    useEffect(() => {
        if (member) {
            setName(member.name);
            setStatus(member.status);
            setRole(member.role);
            setEmail(member.email);
            setTeam(member.team || []);
        }
    }, [member]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEditMember({
            id: member?.id || '',
            name,
            status,
            role,
            email,
            team,
            avatar: '',
            username: '',
            dob: new Date(),
            nationality: '',
            contact: '',
            research: '' 
          });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white space-y-5 p-4 rounded-md w-1/2">
                <h2 className="text-2xl font-semibold mb-4 ">Edit Member</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <div className="mb-4 flex">
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <input
                            type="checkbox"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Team</label>
                        <input
                            type="text"
                            value={team.join(', ')}
                            onChange={(e) => setTeam(e.target.value.split(',').map(t => t.trim()))}
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMemberModal;

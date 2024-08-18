import React, { FC } from 'react';
import type { Data } from '@/lib/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface MemberDetailsProps {
  member: Data | null;
  onClose: () => void;
}

const MemberDetails: FC<MemberDetailsProps> = ({ member, onClose }) => {
  if (!member) return null;

  const dob = member.dob ? new Date(member.dob) : new Date();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 w-1/3 rounded-md shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <XMarkIcon className='h-5 w-5'/>
        </button>
        <div className="text-center">
          <Image
            src={member.avatar || '/default-avatar.png'} 
            alt={`${member.name}'s avatar`}
            className="rounded-full w-24 h-24 mx-auto"
            width={10}
            height={10}
          />
          <h2 className="text-xl font-bold">{member.name}</h2>
          <p>@{member.username || 'N/A'}</p> 
          <p>{member.role}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <p>Date of Birth: {dob.toLocaleDateString()}</p>
          <p>Nationality: {member.nationality || 'N/A'}</p>
          <p>Contact: {member.contact || 'N/A'}</p> 
          <p>Email: {member.email}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Research & Publication</h3>
          <p>{member.research || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;

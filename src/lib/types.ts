export interface Data {
    id: string;
    avatar?: string;
    name: string;
    username?: string;
    status: boolean;
    role: string;
    email: string;
    team: string[];
    dob?: Date;
    nationality?: string;
    contact?: string;
    research?: string;
}

export interface EditMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: Data | null;
    onEditMember: (updatedMember: Partial<Data>) => void; // Ensure this matches the function signature
}

export interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMember: (member: Omit<Data, 'id' | 'avatar' | 'username'>) => void;
}
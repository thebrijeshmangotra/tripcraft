import React from "react";
import { UserIcon, SettingsIcon, LogOutIcon } from "./IconComponents";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface ProfileCardProps {
  user: User;
  onClose: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClose }) => {
  const menuItems = [
    { icon: <UserIcon className="w-4 h-4" />, text: "View Profile" },
    { icon: <SettingsIcon className="w-4 h-4" />, text: "Settings" },
    { icon: <LogOutIcon className="w-4 h-4" />, text: "Logout" },
  ];

  const handleAction = (text: string) => {
    alert(`${text} clicked. This is for demonstration purposes.`);
    onClose();
  };

  return (
    <div className="absolute bottom-20 left-4 w-60 bg-popover text-popover-foreground rounded-lg border border-border shadow-lg z-50 animate-fade-in">
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleAction(item.text)}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-md hover:bg-muted"
          >
            {item.icon}
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;

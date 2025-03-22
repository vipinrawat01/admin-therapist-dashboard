
import { useState } from 'react';
import { MoreVertical, ShieldAlert, ShieldCheck, User, UserCog, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'supervisor' | 'parent' | 'therapist';
    status: 'active' | 'inactive' | 'pending';
    lastActive?: string;
  };
  onRoleChange: (id: string, role: string) => void;
  onRemove: (id: string) => void;
  isCurrentUser?: boolean;
}

const UserCard = ({ user, onRoleChange, onRemove, isCurrentUser = false }: UserCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const roleConfig = {
    admin: {
      icon: ShieldAlert,
      badge: 'bg-therapy-red/10 text-therapy-red',
      label: 'Admin'
    },
    supervisor: {
      icon: ShieldCheck,
      badge: 'bg-therapy-blue/10 text-therapy-blue',
      label: 'Supervisor'
    },
    parent: {
      icon: User,
      badge: 'bg-therapy-green/10 text-therapy-green',
      label: 'Parent'
    },
    therapist: {
      icon: UserCog,
      badge: 'bg-therapy-purple/10 text-therapy-purple',
      label: 'Therapist'
    }
  };

  const statusConfig = {
    active: 'bg-therapy-green/10 text-therapy-green',
    inactive: 'bg-therapy-red/10 text-therapy-red',
    pending: 'bg-therapy-yellow/10 text-therapy-yellow',
  };

  const RoleIcon = roleConfig[user.role].icon;

  return (
    <div 
      className={cn(
        "therapy-card transition-all card-hover-effect relative",
        isHovered && "transform-gpu"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight bar animation */}
      <div
        className={cn(
          "absolute top-0 left-0 h-1 bg-primary transition-all duration-300", 
          isHovered ? "w-full" : "w-0"
        )}
      />
      
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="avatar-initial w-10 h-10 text-white">
            {user.name.charAt(0)}
          </div>
          
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <span className={cn("therapy-badge flex items-center gap-1", roleConfig[user.role].badge)}>
                <RoleIcon className="w-3 h-3" />
                <span>{roleConfig[user.role].label}</span>
              </span>
              
              <span className={cn("therapy-badge", statusConfig[user.status])}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
            
            {user.lastActive && (
              <p className="text-xs text-muted-foreground mt-2">
                Last active: {user.lastActive}
              </p>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled={isCurrentUser} onClick={() => onRoleChange(user.id, 'admin')}>
              <ShieldAlert className="mr-2 h-4 w-4" /> Change to Admin
            </DropdownMenuItem>
            <DropdownMenuItem disabled={isCurrentUser} onClick={() => onRoleChange(user.id, 'supervisor')}>
              <ShieldCheck className="mr-2 h-4 w-4" /> Change to Supervisor
            </DropdownMenuItem>
            <DropdownMenuItem disabled={isCurrentUser} onClick={() => onRoleChange(user.id, 'parent')}>
              <User className="mr-2 h-4 w-4" /> Change to Parent
            </DropdownMenuItem>
            <DropdownMenuItem disabled={isCurrentUser} onClick={() => onRoleChange(user.id, 'therapist')}>
              <UserCog className="mr-2 h-4 w-4" /> Change to Therapist
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-therapy-red focus:text-therapy-red" 
              disabled={isCurrentUser && user.role === 'admin'} 
              onClick={() => onRemove(user.id)}
            >
              <UserX className="mr-2 h-4 w-4" /> Remove User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserCard;

import type { User } from '@app/types';

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
        Participants ({users.length})
      </h2>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div 
                className={`w-3 h-3 rounded-full ${
                  user.hasVoted 
                    ? 'bg-light-green dark:bg-dark-green animate-pulse' 
                    : 'bg-gray-300 dark:bg-gray-500'
                }`}
              />
              <span className="text-light-text dark:text-dark-text font-medium">
                {user.name}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {user.hasVoted ? 'Voted' : 'Waiting'}
            </div>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No participants yet
        </div>
      )}
    </div>
  );
};
import type { User } from '@app/types';

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Participants ({users.length})
      </h2>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200"
            style={{
              backgroundColor: user.hasVoted ? 'var(--color-light-green-bg)' : 'var(--color-light-yellow-bg)',
              borderColor: user.hasVoted ? 'var(--color-light-green)' : 'var(--color-light-yellow)'
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: user.hasVoted ? 'var(--color-light-green)' : 'var(--color-light-yellow)',
                  animation: user.hasVoted ? 'pulse 2s infinite' : 'none'
                }}
              />
              <span className="text-gray-900 dark:text-white font-medium">
                {user.name}
              </span>
            </div>
            
            <div 
              className="text-xs font-medium"
              style={{
                color: user.hasVoted ? 'var(--color-light-green)' : 'var(--color-light-yellow)'
              }}
            >
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
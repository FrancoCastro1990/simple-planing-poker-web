import type { Room } from '@app/types';

interface RoomHeaderProps {
  room: Room;
  onLeave: () => void;
  onReset: () => void;
  canReset: boolean;
}

export const RoomHeader = ({ room, onLeave, onReset, canReset }: RoomHeaderProps) => {
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(room.id);
    } catch (error) {
      console.error('Failed to copy room ID:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {room.title || `Room ${room.id}`}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Room ID:</span>
            <button
              onClick={copyRoomId}
              className="font-mono text-sm px-2 py-1 rounded transition-all duration-200 font-medium"
              style={{
                backgroundColor: 'var(--color-light-magenta-bg)',
                color: 'var(--color-light-magenta)',
                border: '1px solid var(--color-light-magenta)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-light-magenta)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-light-magenta-bg)';
                e.target.style.color = 'var(--color-light-magenta)';
              }}
              title="Click to copy"
            >
              {room.id}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {canReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 text-white rounded-lg transition-all duration-200 font-medium"
              style={{ backgroundColor: 'var(--color-light-yellow)' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-light-yellow-hover)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-light-yellow)';
              }}
            >
              Reset Votes
            </button>
          )}
          <button
            onClick={onLeave}
            className="px-4 py-2 text-white rounded-lg transition-all duration-200 font-medium"
            style={{ backgroundColor: 'var(--color-light-red)' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--color-light-red-hover)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--color-light-red)';
            }}
          >
            Leave Room
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
        <span>{room.users.length} participant{room.users.length !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>{Object.keys(room.votes).length} vote{Object.keys(room.votes).length !== 1 ? 's' : ''}</span>
        {room.isRevealed && (
          <>
            <span>•</span>
            <span className="font-medium" style={{ color: 'var(--color-light-green)' }}>
              Votes Revealed
            </span>
          </>
        )}
      </div>
    </div>
  );
};
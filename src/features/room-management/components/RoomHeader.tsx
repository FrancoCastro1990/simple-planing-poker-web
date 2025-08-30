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
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
            {room.title || `Room ${room.id}`}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Room ID:</span>
            <button
              onClick={copyRoomId}
              className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded 
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
                       text-light-text dark:text-dark-text"
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
              className="px-4 py-2 bg-light-yellow dark:bg-dark-yellow text-white 
                       rounded-lg hover:opacity-90 transition-opacity"
            >
              Reset Votes
            </button>
          )}
          <button
            onClick={onLeave}
            className="px-4 py-2 bg-light-red dark:bg-dark-red text-white 
                     rounded-lg hover:opacity-90 transition-opacity"
          >
            Leave Room
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{room.users.length} participant{room.users.length !== 1 ? 's' : ''}</span>
        <span>•</span>
        <span>{Object.keys(room.votes).length} vote{Object.keys(room.votes).length !== 1 ? 's' : ''}</span>
        {room.isRevealed && (
          <>
            <span>•</span>
            <span className="text-light-green dark:text-dark-green font-medium">
              Votes Revealed
            </span>
          </>
        )}
      </div>
    </div>
  );
};
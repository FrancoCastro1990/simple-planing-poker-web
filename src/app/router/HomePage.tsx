import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalUser } from '@features/authentication/useLocalUser';
import { useRoomSession } from '@features/room-management/useRoomSession';
//import { isValidRoomId } from '@shared/utils';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user, saveUser, hasUser } = useLocalUser();
  const { navigateToCurrentRoom } = useRoomSession();
  const [userName, setUserName] = useState('');
  const [roomTitle, setRoomTitle] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [error, setError] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  // Auto-navigate to current room if user has one and is logged in
  useEffect(() => {
    if (hasUser) {
      navigateToCurrentRoom();
    }
  }, [hasUser, navigateToCurrentRoom]);

  const handleSaveUser = () => {
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    try {
      saveUser(userName);
      setError('');
    } catch (err) {
      setError('Failed to save user name');
    }
  };

  const handleCreateRoom = async () => {
    if (!hasUser) {
      setError('Please set your name first');
      return;
    }

    setIsCreatingRoom(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: roomTitle.trim() || undefined,
          maxUsers: 10,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        navigate(`/room/${result.data.id}`);
      } else {
        throw new Error(result.message || 'Failed to create room');
      }
    } catch (err) {
      console.error('Failed to create room:', err);
      setError('Failed to create room. Please try again.');
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleJoinRoom = () => {
    if (!hasUser) {
      setError('Please set your name first');
      return;
    }

    if (!joinRoomId.trim()) {
      setError('Please enter a room ID');
      return;
    }

    const roomId = joinRoomId.trim();
    // if (!isValidRoomId(roomId)) {
    //   setError('Room ID must be 6 letters (mixed case allowed)');
    //   return;
    // }

    navigate(`/room/${roomId}`);
  };

  if (!hasUser) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-slide-up">
          <h1 className="text-3xl font-bold text-center mb-8 text-light-text dark:text-dark-text">
            Planning Poker
          </h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
                Enter your name to continue
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveUser()}
                placeholder="Your name"
                className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200
                         bg-white dark:bg-gray-700 text-light-text dark:text-dark-text
                         focus:outline-none focus:ring-0"
                style={{
                  borderColor: 'var(--color-light-blue)',
                  '--tw-ring-color': 'var(--color-light-blue)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-light-blue-hover)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-light-blue)'}
                maxLength={50}
              />
            </div>
            
            {error && (
              <p className="text-sm font-medium" style={{ color: 'var(--color-light-red)' }}>{error}</p>
            )}
            
            <button
              onClick={handleSaveUser}
              disabled={!userName.trim()}
              className="w-full py-2 px-4 text-white rounded-lg disabled:cursor-not-allowed
                       transition-all duration-200 font-medium"
              style={{
                backgroundColor: userName.trim() ? 'var(--color-light-blue)' : 'var(--color-light-bg)',
                opacity: userName.trim() ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                if (userName.trim()) {
                  e.target.style.backgroundColor = 'var(--color-light-blue-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (userName.trim()) {
                  e.target.style.backgroundColor = 'var(--color-light-blue)';
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-light-text dark:text-dark-text">
            Planning Poker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome, <span className="font-medium">{user?.name}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              Create New Room
            </h2>
            
            <input
              type="text"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
              placeholder="Room title (optional)"
              className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200
                       bg-white dark:bg-gray-700 text-light-text dark:text-dark-text
                       focus:outline-none focus:ring-0"
              style={{
                borderColor: 'var(--color-light-green)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-light-green-hover)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-light-green)'}
              maxLength={100}
            />
            
            <button
              onClick={handleCreateRoom}
              disabled={isCreatingRoom}
              className="w-full py-3 px-4 text-white rounded-lg disabled:cursor-not-allowed 
                       transition-all duration-200 font-medium"
              style={{
                backgroundColor: isCreatingRoom ? 'var(--color-light-green)' : 'var(--color-light-green)',
                opacity: isCreatingRoom ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isCreatingRoom) {
                  e.target.style.backgroundColor = 'var(--color-light-green-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCreatingRoom) {
                  e.target.style.backgroundColor = 'var(--color-light-green)';
                }
              }}
            >
              {isCreatingRoom ? 'Creating Room...' : 'Create Room'}
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">
              Join Existing Room
            </h2>
            
            <input
              type="text"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
              placeholder="Enter room ID (6 letters)"
              className="w-full px-4 py-2 border-2 rounded-lg transition-all duration-200
                       bg-white dark:bg-gray-700 text-light-text dark:text-dark-text
                       focus:outline-none focus:ring-0
                       font-mono text-center tracking-widest"
              style={{
                borderColor: 'var(--color-light-magenta)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-light-magenta-hover)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-light-magenta)'}
              maxLength={6}
            />
            
            <button
              onClick={handleJoinRoom}
              //disabled={!joinRoomId.trim()}
              className="w-full mt-4 py-3 px-4 text-white rounded-lg
                       transition-all duration-200 font-medium"
              style={{
                backgroundColor: 'var(--color-light-magenta)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-light-magenta-hover)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-light-magenta)';
              }}
            >
              Join Room
            </button>
          </div>
          
          {error && (
            <p className="text-sm text-center font-medium" style={{ color: 'var(--color-light-red)' }}>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
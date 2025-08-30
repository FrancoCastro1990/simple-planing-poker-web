import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalUser } from '@features/authentication/useLocalUser';
import { RoomHeader } from './components/RoomHeader';
import { UserList } from './components/UserList';
import { VotingArea } from '@features/voting/VotingArea';
import { ResultsPanel } from '@features/voting/ResultsPanel';
import { useRoom } from './useRoom';

interface RoomContainerProps {
  roomId: string;
}

export const RoomContainer = ({ roomId }: RoomContainerProps) => {
  const navigate = useNavigate();
  const { user } = useLocalUser();
  const { 
    room, 
    isConnected, 
    error, 
    joinRoom, 
    leaveRoom,
    vote,
    revealVotes,
    resetVotes 
  } = useRoom();

  useEffect(() => {
    if (user) {
      joinRoom(roomId, user);
    }

    return () => {
      leaveRoom();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, user]);

  const handleLeaveRoom = () => {
    leaveRoom();
    navigate('/');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-blue dark:border-dark-blue mx-auto mb-4"></div>
          <p className="text-light-text dark:text-dark-text">
            Connecting to room...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-light-red dark:text-dark-red mb-4">{error}</p>
          <button
            onClick={handleLeaveRoom}
            className="px-4 py-2 bg-light-blue dark:bg-dark-blue text-white rounded-lg hover:opacity-90"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-light-text dark:text-dark-text">Room not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-6">
        <RoomHeader 
          room={room}
          onLeave={handleLeaveRoom}
          onReset={resetVotes}
          canReset={Object.keys(room.votes).length > 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1">
            <UserList users={room.users} />
          </div>
          
          <div className="lg:col-span-2">
            <VotingArea
              currentUserVote={user ? room.votes[user.id] : undefined}
              onVote={vote}
              isRevealed={room.isRevealed}
              canVote={!!user}
              userId={user?.id}
            />
          </div>
          
          <div className="lg:col-span-1">
            <ResultsPanel
              votes={room.votes}
              users={room.users}
              isRevealed={room.isRevealed}
              onReveal={revealVotes}
              canReveal={Object.keys(room.votes).length > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
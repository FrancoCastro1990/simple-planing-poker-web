import { useParams, Navigate } from 'react-router-dom';
import { useLocalUser } from '@features/authentication/useLocalUser';
//import { isValidRoomId } from '@shared/utils';
import { RoomContainer } from '@features/room-management/RoomContainer';

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { hasUser, isLoading } = useLocalUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-light-text dark:text-dark-text">Loading...</div>
      </div>
    );
  }

  if (!hasUser) {
    return <Navigate to="/" replace />;
  }

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return <RoomContainer roomId={id} />;
};
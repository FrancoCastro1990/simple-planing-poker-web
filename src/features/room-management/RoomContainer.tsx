import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Spin, Alert, Button, Space } from 'antd';
import { LoadingOutlined, HomeOutlined } from '@ant-design/icons';
import { useLocalUser } from '@features/authentication/useLocalUser';
import { useRoomSession } from './useRoomSession';
import { RoomHeader } from './components/RoomHeader';
import { UserList } from './components/UserList';
import { VotingArea } from '@features/voting/VotingArea';
import { ResultsPanel } from '@features/voting/ResultsPanel';
import { useRoom } from './useRoom';

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface RoomContainerProps {
  roomId: string;
}

export const RoomContainer = ({ roomId }: RoomContainerProps) => {
  const navigate = useNavigate();
  const { user } = useLocalUser();
  const { clearCurrentRoom } = useRoomSession();
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
    clearCurrentRoom();
    navigate('/');
  };

  if (!isConnected) {
    return (
      <Layout className="full-height">
        <Content className="center-content">
          <Space direction="vertical" size="large" style={{ textAlign: 'center' }}>
            <Spin indicator={antIcon} />
            <p>Connecting to room...</p>
          </Space>
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout className="full-height">
        <Content className="center-content">
          <Space direction="vertical" size="large" style={{ textAlign: 'center' }}>
            <Alert message={error} type="error" showIcon />
            <Button 
              type="primary"
              icon={<HomeOutlined />}
              onClick={handleLeaveRoom}
            >
              Back to Home
            </Button>
          </Space>
        </Content>
      </Layout>
    );
  }

  if (!room) {
    return (
      <Layout className="full-height">
        <Content className="center-content">
          <Alert message="Room not found" type="warning" showIcon />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="full-height" style={{ backgroundColor: '#f5f5f5' }}>
      <Content style={{ padding: '16px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <RoomHeader 
            room={room}
            onLeave={handleLeaveRoom}
            onReset={resetVotes}
            canReset={Object.keys(room.votes).length > 0}
          />

          {/* Mobile-first responsive grid */}
          <Row gutter={[16, 16]}>
            {/* UserList - Full width on mobile, sidebar on desktop */}
            <Col xs={24} sm={24} md={8} lg={6} xl={5}>
              <UserList users={room.users} />
            </Col>
            
            {/* VotingArea - Main content area */}
            <Col xs={24} sm={24} md={16} lg={12} xl={14}>
              <VotingArea
                currentUserVote={user ? room.votes[user.id] : undefined}
                onVote={vote}
                isRevealed={room.isRevealed}
                canVote={!!user}
                userId={user?.id}
              />
            </Col>
            
            {/* ResultsPanel - Full width on mobile, sidebar on desktop */}
            <Col xs={24} sm={24} md={24} lg={6} xl={5}>
              <ResultsPanel
                votes={room.votes}
                users={room.users}
                isRevealed={room.isRevealed}
                onReveal={revealVotes}
                canReveal={Object.keys(room.votes).length > 0}
              />
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Input, Button, Typography, Space, Alert } from 'antd';
import { UserOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { useLocalUser } from '@features/authentication/useLocalUser';
import { useRoomSession } from '@features/room-management/useRoomSession';

const { Title, Text } = Typography;

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
      <div className="full-height center-content" style={{ padding: '16px' }}>
        <Row justify="center" style={{ width: '100%' }}>
          <Col xs={22} sm={16} md={12} lg={8} xl={6}>
            <Card 
              style={{ 
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={2} style={{ marginBottom: 8 }}>
                    Planning Poker
                  </Title>
                  <Text type="secondary">
                    Enter your name to continue
                  </Text>
                </div>

                <Form onFinish={handleSaveUser} layout="vertical">
                  <Form.Item
                    name="userName"
                    rules={[
                      { required: true, message: 'Please enter your name' },
                      { max: 50, message: 'Name must be less than 50 characters' }
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<UserOutlined />}
                      placeholder="Your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onPressEnter={handleSaveUser}
                    />
                  </Form.Item>

                  {error && (
                    <Alert 
                      message={error} 
                      type="error" 
                      showIcon 
                      style={{ marginBottom: 16 }} 
                    />
                  )}

                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                      type="primary" 
                      size="large" 
                      htmlType="submit"
                      loading={false}
                      disabled={!userName.trim()}
                      block
                      icon={<LoginOutlined />}
                    >
                      Continue
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="full-height center-content" style={{ padding: '16px' }}>
      <Row justify="center" style={{ width: '100%' }}>
        <Col xs={22} sm={18} md={14} lg={10} xl={8}>
          <Card 
            style={{ 
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={2} style={{ marginBottom: 8 }}>
                  Planning Poker
                </Title>
                <Text type="secondary">
                  Welcome, <Text strong>{user?.name}</Text>
                </Text>
              </div>

              <Row gutter={[0, 24]}>
                <Col span={24}>
                  <Card 
                    type="inner" 
                    title={
                      <Space>
                        <HomeOutlined />
                        Create New Room
                      </Space>
                    }
                  >
                    <Form onFinish={handleCreateRoom} layout="vertical">
                      <Form.Item name="roomTitle">
                        <Input
                          size="large"
                          placeholder="Room title (optional)"
                          value={roomTitle}
                          onChange={(e) => setRoomTitle(e.target.value)}
                          maxLength={100}
                        />
                      </Form.Item>

                      <Form.Item style={{ marginBottom: 0 }}>
                        <Button 
                          type="primary"
                          size="large"
                          htmlType="submit"
                          loading={isCreatingRoom}
                          block
                          icon={<HomeOutlined />}
                        >
                          {isCreatingRoom ? 'Creating Room...' : 'Create Room'}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card 
                    type="inner" 
                    title={
                      <Space>
                        <LoginOutlined />
                        Join Existing Room
                      </Space>
                    }
                  >
                    <Form onFinish={handleJoinRoom} layout="vertical">
                      <Form.Item
                        name="joinRoomId"
                        rules={[
                          { required: true, message: 'Please enter a room ID' },
                          { len: 6, message: 'Room ID must be exactly 6 characters' }
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter room ID (6 letters)"
                          value={joinRoomId}
                          onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                          onPressEnter={handleJoinRoom}
                          maxLength={6}
                          style={{ 
                            fontFamily: 'monospace', 
                            textAlign: 'center', 
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                          }}
                        />
                      </Form.Item>

                      <Form.Item style={{ marginBottom: 0 }}>
                        <Button 
                          htmlType="submit"
                          size="large"
                          block
                          icon={<LoginOutlined />}
                        >
                          Join Room
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
              
              {error && (
                <Alert 
                  message={error} 
                  type="error" 
                  showIcon 
                  closable
                  onClose={() => setError('')}
                />
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
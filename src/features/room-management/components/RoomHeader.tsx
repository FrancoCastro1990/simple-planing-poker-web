import { Row, Col, Card, Button, Typography, Space, message, Tag } from 'antd';
import { CopyOutlined, ReloadOutlined, LogoutOutlined, HomeOutlined, UserOutlined, TrophyOutlined } from '@ant-design/icons';
import type { Room } from '@app/types';

const { Title, Text } = Typography;

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
      message.success('Room ID copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy room ID:', error);
      message.error('Failed to copy room ID');
    }
  };

  return (
    <Card>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={14} lg={16}>
          <Space direction="vertical" size="small">
            <Title level={2} style={{ margin: 0 }}>
              <Space>
                <HomeOutlined />
                {room.title || `Room ${room.id}`}
              </Space>
            </Title>
            
            <Space size="small">
              <Text type="secondary">Room ID:</Text>
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={copyRoomId}
                style={{
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  backgroundColor: '#f5e8f2',
                  borderColor: '#8f3f71',
                  color: '#8f3f71',
                  fontWeight: 'bold'
                }}
              >
                {room.id}
              </Button>
            </Space>
            
            <Space size="middle" wrap>
              <Space size="small">
                <UserOutlined style={{ color: '#076678' }} />
                <Text>
                  {room.users.length} participant{room.users.length !== 1 ? 's' : ''}
                </Text>
              </Space>
              
              <Text type="secondary">•</Text>
              
              <Space size="small">
                <TrophyOutlined style={{ color: '#076678' }} />
                <Text>
                  {Object.keys(room.votes).length} vote{Object.keys(room.votes).length !== 1 ? 's' : ''}
                </Text>
              </Space>
              
              {room.isRevealed && (
                <>
                  <Text type="secondary">•</Text>
                  <Tag color="success" icon={<TrophyOutlined />}>
                    Votes Revealed
                  </Tag>
                </>
              )}
            </Space>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={10} lg={8}>
          <Space size="small" style={{ width: '100%', justifyContent: 'flex-end' }} wrap>
            {canReset && (
              <Button
                type="default"
                icon={<ReloadOutlined />}
                onClick={onReset}
                style={{
                  backgroundColor: '#b57614',
                  borderColor: '#b57614',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c7801a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#b57614';
                }}
              >
                Reset Votes
              </Button>
            )}
            
            <Button
              danger
              icon={<LogoutOutlined />}
              onClick={onLeave}
            >
              Leave Room
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
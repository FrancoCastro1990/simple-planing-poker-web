import { Card, List, Avatar, Badge, Typography, Space, Empty } from 'antd';
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { User } from '@app/types';

const { Title, Text } = Typography;

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <Card 
      title={
        <Space>
          <UserOutlined />
          <Title level={3} style={{ margin: 0 }}>
            Participants ({users.length})
          </Title>
        </Space>
      }
      style={{ height: '100%' }}
    >
      {users.length > 0 ? (
        <List
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '8px',
                border: '2px solid',
                borderColor: user.hasVoted ? '#427b58' : '#b57614',
                backgroundColor: user.hasVoted ? '#e8f5e8' : '#fef3e2',
                transition: 'all 0.3s ease',
              }}
            >
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                  <Badge 
                    status={user.hasVoted ? 'success' : 'warning'}
                    dot
                    style={{
                      animation: user.hasVoted ? 'pulse 2s infinite' : 'none'
                    }}
                  />
                  <Avatar 
                    icon={<UserOutlined />} 
                    size="small"
                    style={{
                      backgroundColor: user.hasVoted ? '#427b58' : '#b57614'
                    }}
                  />
                  <Text strong>{user.name}</Text>
                </Space>
                
                <Space>
                  {user.hasVoted ? (
                    <>
                      <CheckCircleOutlined style={{ color: '#427b58' }} />
                      <Text 
                        style={{ 
                          fontSize: '12px', 
                          color: '#427b58',
                          fontWeight: 'bold'
                        }}
                      >
                        Voted
                      </Text>
                    </>
                  ) : (
                    <>
                      <ClockCircleOutlined style={{ color: '#b57614' }} />
                      <Text 
                        style={{ 
                          fontSize: '12px', 
                          color: '#b57614',
                          fontWeight: 'bold'
                        }}
                      >
                        Waiting
                      </Text>
                    </>
                  )}
                </Space>
              </Space>
            </List.Item>
          )}
        />
      ) : (
        <Empty 
          description="No participants yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Card>
  );
};
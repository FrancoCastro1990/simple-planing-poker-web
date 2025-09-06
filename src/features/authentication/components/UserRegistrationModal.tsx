import { useState } from 'react';
import { Modal, Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface UserRegistrationModalProps {
  visible: boolean;
  onSave: (name: string) => void;
  roomId?: string;
}

export const UserRegistrationModal = ({ visible, onSave, roomId }: UserRegistrationModalProps) => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      onSave(userName.trim());
    } catch (error) {
      console.error('Form validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={null}
      open={visible}
      closable={false}
      maskClosable={false}
      footer={null}
      centered
      width={400}
    >
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <div>
          <Title level={3} style={{ marginBottom: 8 }}>
            Welcome to Planning Poker
          </Title>
          {roomId && (
            <Text type="secondary">
              You're joining room: <Text code strong>{roomId}</Text>
            </Text>
          )}
        </div>

        <Form
          form={form}
          onFinish={handleSave}
          layout="vertical"
          style={{ width: '100%' }}
        >
          <Form.Item
            name="userName"
            label="Enter your name to continue"
            rules={[
              { required: true, message: 'Please enter your name' },
              { min: 2, message: 'Name must be at least 2 characters' },
              { max: 50, message: 'Name must be less than 50 characters' }
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onPressEnter={handleSave}
              autoFocus
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              size="large" 
              htmlType="submit"
              loading={loading}
              disabled={!userName.trim()}
              block
              icon={<LoginOutlined />}
            >
              Join Room
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
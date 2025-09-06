import { useParams, Navigate } from 'react-router-dom';
import { Spin, Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useLocalUser } from '@features/authentication/useLocalUser';
import { RoomContainer } from '@features/room-management/RoomContainer';
import { UserRegistrationModal } from '@features/authentication/components/UserRegistrationModal';

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { hasUser, isLoading, saveUser } = useLocalUser();

  if (isLoading) {
    return (
      <Layout className="full-height">
        <Content className="center-content">
          <Spin indicator={antIcon} />
        </Content>
      </Layout>
    );
  }

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const handleUserRegistration = (name: string) => {
    try {
      saveUser(name);
      // El usuario se guardará y el componente se re-renderizará automáticamente
      // mostrando el RoomContainer
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  if (!hasUser) {
    return (
      <>
        <Layout className="full-height">
          <Content className="center-content">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h2>Planning Poker</h2>
              <p>You need to register before joining the room</p>
            </div>
          </Content>
        </Layout>
        <UserRegistrationModal
          visible={true}
          onSave={handleUserRegistration}
          roomId={id}
        />
      </>
    );
  }

  return <RoomContainer roomId={id} />;
};
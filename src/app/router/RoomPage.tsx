import { useParams, Navigate } from 'react-router-dom';
import { Spin, Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useLocalUser } from '@features/authentication/useLocalUser';
import { RoomContainer } from '@features/room-management/RoomContainer';

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { hasUser, isLoading } = useLocalUser();

  if (isLoading) {
    return (
      <Layout className="full-height">
        <Content className="center-content">
          <Spin indicator={antIcon} />
        </Content>
      </Layout>
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
import { Card, Button, Typography, Space, Statistic, List, Tag, Empty } from 'antd';
import { EyeOutlined, TrophyOutlined, BarChartOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { User, FibonacciCard } from '@app/types';
import { useVoteCalculations } from '@shared/hooks/useVoteCalculations';
import { formatVoteForDisplay } from '@shared/utils';

const { Title, Text } = Typography;

interface ResultsPanelProps {
  votes: Record<string, FibonacciCard>;
  users: User[];
  isRevealed: boolean;
  onReveal: () => void;
  canReveal: boolean;
}

export const ResultsPanel = ({ votes, users, isRevealed, onReveal, canReveal }: ResultsPanelProps) => {
  const userNames = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {} as Record<string, string>);

  const { totalVotes, average, results } = useVoteCalculations(votes, userNames);

  if (!isRevealed) {
    return (
      <Card 
        title={
          <Space>
            <BarChartOutlined />
            <Title level={3} style={{ margin: 0 }}>Results</Title>
          </Space>
        }
        style={{ height: '100%' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <Statistic
            title="Votes Cast"
            value={totalVotes}
            suffix={totalVotes !== 1 ? 'votes' : 'vote'}
            valueStyle={{ fontSize: '2rem', fontWeight: 'bold' }}
          />
          
          <Button 
            type="primary"
            size="large"
            icon={<EyeOutlined />}
            onClick={onReveal}
            disabled={!canReveal}
            block
          >
            Reveal Votes
          </Button>
          
          {!canReveal && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Need at least one vote to reveal
            </Text>
          )}
        </Space>
      </Card>
    );
  }

  return (
    <Card 
      title={
        <Space>
          <TrophyOutlined />
          <Title level={3} style={{ margin: 0 }}>Results</Title>
        </Space>
      }
      style={{ height: '100%' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Statistic
            title="Average"
            value={average}
            precision={1}
            valueStyle={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#076678' 
            }}
          />
        </div>
        
        {results.length > 0 ? (
          <List
            dataSource={results}
            renderItem={(result) => (
              <List.Item
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  border: '2px solid',
                  borderColor: result.isHighest 
                    ? '#9d0006' 
                    : result.isLowest 
                    ? '#076678'
                    : '#427b58',
                  backgroundColor: result.isHighest 
                    ? '#fdeaea' 
                    : result.isLowest 
                    ? '#e8f4f8'
                    : '#e8f5e8',
                }}
              >
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Space>
                    <Text strong>{result.userName}</Text>
                    {result.isHighest && (
                      <Tag color="red" icon={<ArrowUpOutlined />}>
                        HIGH
                      </Tag>
                    )}
                    {result.isLowest && (
                      <Tag color="blue" icon={<ArrowDownOutlined />}>
                        LOW
                      </Tag>
                    )}
                  </Space>
                  
                  <Text 
                    style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold',
                      fontFamily: 'monospace' 
                    }}
                  >
                    {formatVoteForDisplay(result.vote)}
                  </Text>
                </Space>
              </List.Item>
            )}
          />
        ) : (
          <Empty 
            description="No votes to display"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Space>
    </Card>
  );
};
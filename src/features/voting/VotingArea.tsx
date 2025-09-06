import { Row, Col, Card, Typography, Alert, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import type { FibonacciCard } from '@app/types';
import { FIBONACCI_SEQUENCE } from '@shared/constants';
import { formatVoteForDisplay } from '@shared/utils';

const { Title, Text } = Typography;

interface VotingAreaProps {
  currentUserVote?: FibonacciCard;
  onVote: (vote: FibonacciCard, userId: string) => void;
  isRevealed: boolean;
  canVote: boolean;
  userId?: string;
}

export const VotingArea = ({ currentUserVote, onVote, isRevealed, canVote, userId }: VotingAreaProps) => {
  const handleVote = (vote: FibonacciCard) => {
    if (!canVote || !userId || isRevealed) return;
    onVote(vote, userId);
  };

  return (
    <Card 
      title={
        <Title level={3} style={{ margin: 0 }}>
          Choose Your Estimate
        </Title>
      }
      style={{ height: '100%' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {isRevealed && (
          <Alert
            message="Votes have been revealed! Reset to vote again."
            type="success"
            showIcon
          />
        )}
        
        <Row gutter={[12, 12]} justify="center">
          {FIBONACCI_SEQUENCE.map((value) => {
            const isSelected = currentUserVote === value;
            const isDisabled = !canVote || isRevealed;
            
            return (
              <Col 
                key={value} 
                xs={6} 
                sm={4} 
                md={4} 
                lg={3} 
                xl={3}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  hoverable={!isDisabled}
                  onClick={() => handleVote(value)}
                  style={{
                    width: '100%',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    backgroundColor: isSelected ? '#8f3f71' : undefined,
                    borderColor: isSelected ? '#8f3f71' : '#b57614',
                    borderWidth: 2,
                    opacity: isDisabled ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  }}
                  bodyStyle={{
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: isSelected ? 'white' : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isSelected) {
                      e.currentTarget.style.backgroundColor = '#fef3e2';
                      e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled && !isSelected) {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    {formatVoteForDisplay(value)}
                    {isSelected && (
                      <CheckOutlined 
                        style={{ 
                          position: 'absolute', 
                          top: '-8px', 
                          right: '-8px', 
                          color: 'white',
                          fontSize: '12px'
                        }} 
                      />
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
        
        {currentUserVote && !isRevealed && (
          <Alert
            message={
              <Text>
                You voted: <Text strong>{formatVoteForDisplay(currentUserVote)}</Text>
              </Text>
            }
            type="info"
            showIcon
            icon={<CheckOutlined />}
          />
        )}
        
        {!canVote && (
          <Alert
            message="You need to be logged in to vote"
            type="warning"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
};
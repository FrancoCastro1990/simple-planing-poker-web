import type { User, FibonacciCard } from '@app/types';
import { useVoteCalculations } from '@shared/hooks/useVoteCalculations';
import { formatVoteForDisplay } from '@shared/utils';

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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Results
        </h2>
        
        <div className="text-center py-8">
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalVotes}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              vote{totalVotes !== 1 ? 's' : ''} cast
            </div>
          </div>
          
          <button
            onClick={onReveal}
            disabled={!canReveal}
            className="px-6 py-3 text-white rounded-lg disabled:cursor-not-allowed
                     transition-all duration-200 font-medium"
            style={{
              backgroundColor: canReveal ? 'var(--color-light-green)' : 'var(--color-light-bg)',
              opacity: canReveal ? 1 : 0.5
            }}
            onMouseEnter={(e) => {
              if (canReveal) {
                e.target.style.backgroundColor = 'var(--color-light-green-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (canReveal) {
                e.target.style.backgroundColor = 'var(--color-light-green)';
              }
            }}
          >
            Reveal Votes
          </button>
          
          {!canReveal && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Need at least one vote to reveal
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Results
      </h2>
      
      <div className="mb-6 text-center">
        <div className="text-3xl font-bold" style={{ color: 'var(--color-light-blue)' }}>
          {average}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Average
        </div>
      </div>
      
      <div className="space-y-2">
        {results.map((result) => (
          <div
            key={result.userId}
            className="flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200"
            style={{
              backgroundColor: result.isHighest 
                ? 'var(--color-light-red-bg)' 
                : result.isLowest
                ? 'var(--color-light-blue-bg)'
                : 'var(--color-light-green-bg)',
              borderColor: result.isHighest 
                ? 'var(--color-light-red)' 
                : result.isLowest
                ? 'var(--color-light-blue)'
                : 'var(--color-light-green)'
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {result.userName}
              </span>
              {result.isHighest && (
                <span className="text-xs px-2 py-1 text-white rounded font-medium"
                      style={{ backgroundColor: 'var(--color-light-red)' }}>
                  HIGH
                </span>
              )}
              {result.isLowest && (
                <span className="text-xs px-2 py-1 text-white rounded font-medium"
                      style={{ backgroundColor: 'var(--color-light-blue)' }}>
                  LOW
                </span>
              )}
            </div>
            
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatVoteForDisplay(result.vote)}
            </div>
          </div>
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          No votes to display
        </div>
      )}
    </div>
  );
};
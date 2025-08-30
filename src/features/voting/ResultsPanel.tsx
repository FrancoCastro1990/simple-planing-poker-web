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
        <h2 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
          Results
        </h2>
        
        <div className="text-center py-8">
          <div className="mb-4">
            <div className="text-3xl font-bold text-light-text dark:text-dark-text">
              {totalVotes}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              vote{totalVotes !== 1 ? 's' : ''} cast
            </div>
          </div>
          
          <button
            onClick={onReveal}
            disabled={!canReveal}
            className="px-6 py-3 bg-light-green dark:bg-dark-green text-white 
                     rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-opacity font-medium"
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
      <h2 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
        Results
      </h2>
      
      <div className="mb-6 text-center">
        <div className="text-3xl font-bold text-light-blue dark:text-dark-blue">
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
            className={`
              flex items-center justify-between p-3 rounded-lg
              ${result.isHighest 
                ? 'bg-light-red/10 dark:bg-dark-red/10 border border-light-red dark:border-dark-red' 
                : result.isLowest
                ? 'bg-light-blue/10 dark:bg-dark-blue/10 border border-light-blue dark:border-dark-blue'
                : 'bg-gray-50 dark:bg-gray-700'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-light-text dark:text-dark-text">
                {result.userName}
              </span>
              {result.isHighest && (
                <span className="text-xs px-2 py-1 bg-light-red dark:bg-dark-red text-white rounded">
                  HIGH
                </span>
              )}
              {result.isLowest && (
                <span className="text-xs px-2 py-1 bg-light-blue dark:bg-dark-blue text-white rounded">
                  LOW
                </span>
              )}
            </div>
            
            <div className="text-lg font-bold text-light-text dark:text-dark-text">
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
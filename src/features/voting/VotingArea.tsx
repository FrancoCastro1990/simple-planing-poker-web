import type { FibonacciCard } from '@app/types';
import { FIBONACCI_SEQUENCE } from '@shared/constants';
import { formatVoteForDisplay } from '@shared/utils';

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Choose Your Estimate
      </h2>
      
      {isRevealed && (
        <div className="mb-4 p-3 rounded-lg border-2"
             style={{
               backgroundColor: 'var(--color-light-green-bg)',
               borderColor: 'var(--color-light-green)',
               color: 'var(--color-light-green)'
             }}>
          <p className="text-sm font-medium">
            Votes have been revealed! Reset to vote again.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
        {FIBONACCI_SEQUENCE.map((value) => {
          const isSelected = currentUserVote === value;
          const isDisabled = !canVote || isRevealed;
          
          return (
            <button
              key={value}
              onClick={() => handleVote(value)}
              disabled={isDisabled}
              className={`
                aspect-[2/3] rounded-xl border-2 text-xl font-bold transition-all duration-300
                transform hover:scale-105 hover:-translate-y-1 active:scale-95 
                disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
                shadow-lg hover:shadow-xl disabled:shadow-md
                ${isSelected
                  ? 'border-light-magenta dark:border-dark-magenta bg-light-magenta dark:bg-dark-magenta text-white'
                  : 'border-light-yellow dark:border-dark-yellow bg-white dark:bg-gray-700 text-light-text dark:text-dark-text hover:bg-light-yellow-bg dark:hover:bg-dark-yellow-bg hover:border-light-yellow-hover dark:hover:border-dark-yellow-hover'
                }
                ${isDisabled ? 'opacity-50' : ''}
                relative overflow-hidden
              `}
              style={{
                borderColor: isSelected 
                  ? 'var(--color-light-magenta)' 
                  : 'var(--color-light-yellow)',
                backgroundColor: isSelected
                  ? 'var(--color-light-magenta)'
                  : isDisabled 
                    ? undefined
                    : undefined,
                color: isSelected ? 'white' : 'var(--color-light-text)',
              }}
              title={`Vote ${formatVoteForDisplay(value)}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {formatVoteForDisplay(value)}
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
      
      {currentUserVote && !isRevealed && (
        <div className="mt-4 p-3 rounded-lg border-2"
             style={{
               backgroundColor: 'var(--color-light-magenta-bg)',
               borderColor: 'var(--color-light-magenta)',
               color: 'var(--color-light-magenta)'
             }}>
          <p className="text-sm font-medium">
            You voted: <span className="font-bold">{formatVoteForDisplay(currentUserVote)}</span>
          </p>
        </div>
      )}
      
      {!canVote && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            You need to be logged in to vote
          </p>
        </div>
      )}
    </div>
  );
};
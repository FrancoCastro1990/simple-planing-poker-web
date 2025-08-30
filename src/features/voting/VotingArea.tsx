import type { FibonacciCard } from '@app/types';
import { FIBONACCI_SEQUENCE, CARD_LABELS } from '@shared/constants';
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
      <h2 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
        Choose Your Estimate
      </h2>
      
      {isRevealed && (
        <div className="mb-4 p-3 bg-light-green/10 dark:bg-dark-green/10 
                       border border-light-green dark:border-dark-green rounded-lg">
          <p className="text-light-green dark:text-dark-green text-sm">
            Votes have been revealed! Reset to vote again.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {FIBONACCI_SEQUENCE.map((value) => {
          const isSelected = currentUserVote === value;
          const isDisabled = !canVote || isRevealed;
          
          return (
            <button
              key={value}
              onClick={() => handleVote(value)}
              disabled={isDisabled}
              className={`
                aspect-square rounded-lg border-2 text-lg font-bold transition-all duration-200
                hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100
                ${isSelected
                  ? 'border-light-blue dark:border-dark-blue bg-light-blue dark:bg-dark-blue text-white shadow-lg'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-light-text dark:text-dark-text hover:border-light-blue dark:hover:border-dark-blue'
                }
                ${isDisabled ? 'opacity-50' : 'hover:shadow-md'}
              `}
              title={`Vote ${formatVoteForDisplay(value)}`}
            >
              {formatVoteForDisplay(value)}
            </button>
          );
        })}
      </div>
      
      {currentUserVote && !isRevealed && (
        <div className="mt-4 p-3 bg-light-blue/10 dark:bg-dark-blue/10 
                       border border-light-blue dark:border-dark-blue rounded-lg">
          <p className="text-light-blue dark:text-dark-blue text-sm">
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
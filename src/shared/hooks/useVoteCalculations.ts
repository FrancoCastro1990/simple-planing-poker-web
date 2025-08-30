import { useMemo } from 'react';
import type { FibonacciCard, VoteResult } from '@app/types';

export const useVoteCalculations = (votes: Record<string, FibonacciCard>, userNames: Record<string, string>) => {
  const calculations = useMemo(() => {
    const calculateAverage = (voteValues: FibonacciCard[]): number => {
      const numericVotes = voteValues.filter((vote): vote is number => 
        typeof vote === 'number' && vote !== undefined
      );
      
      if (numericVotes.length === 0) return 0;
      
      const sum = numericVotes.reduce((acc, vote) => acc + vote, 0);
      return Math.round((sum / numericVotes.length) * 100) / 100;
    };

    const getValidVotes = (voteValues: FibonacciCard[]): FibonacciCard[] => {
      return voteValues.filter(vote => vote !== undefined);
    };

    const findHighestVote = (numericVotes: number[]): number => {
      return Math.max(...numericVotes);
    };

    const findLowestVote = (numericVotes: number[]): number => {
      return Math.min(...numericVotes);
    };

    const getVoteResults = (): VoteResult[] => {
      const voteEntries = Object.entries(votes);
      const numericVotes = voteEntries
        .filter(([, vote]) => typeof vote === 'number')
        .map(([, vote]) => vote as number);

      const highest = numericVotes.length > 0 ? findHighestVote(numericVotes) : null;
      const lowest = numericVotes.length > 0 ? findLowestVote(numericVotes) : null;

      return voteEntries.map(([userId, vote]) => ({
        userId,
        userName: userNames[userId] || 'Unknown',
        vote,
        isHighest: typeof vote === 'number' && vote === highest && numericVotes.length > 1,
        isLowest: typeof vote === 'number' && vote === lowest && numericVotes.length > 1,
      }));
    };

    const voteValues = Object.values(votes);
    const validVotes = getValidVotes(voteValues);
    const average = calculateAverage(voteValues);
    const results = getVoteResults();

    return {
      totalVotes: validVotes.length,
      average,
      validVotes,
      results,
      calculateAverage,
      getValidVotes,
      findHighestVote,
      findLowestVote,
    };
  }, [votes, userNames]);

  return calculations;
};
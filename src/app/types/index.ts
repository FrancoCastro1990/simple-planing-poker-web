export type FibonacciCard = 0 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 | 89 | 'infinity' | 'unknown';

export interface User {
  id: string;
  name: string;
  hasVoted: boolean;
  vote?: FibonacciCard;
}

export interface Room {
  id: string;
  title?: string;
  users: User[];
  votes: Record<string, FibonacciCard>;
  isRevealed: boolean;
  createdAt: Date;
}

export interface VoteResult {
  userId: string;
  userName: string;
  vote: FibonacciCard;
  isHighest: boolean;
  isLowest: boolean;
}

export interface RoomStats {
  totalVotes: number;
  average: number;
  validVotes: FibonacciCard[];
  results: VoteResult[];
}

export type SocketEvent = 
  | 'join-room' 
  | 'leave-room' 
  | 'vote' 
  | 'reveal-votes' 
  | 'reset-votes'
  | 'user-joined' 
  | 'user-left' 
  | 'vote-cast' 
  | 'votes-revealed'
  | 'room-state-updated'
  | 'error';
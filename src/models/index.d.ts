import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Players {
  O = "O",
  X = "X"
}



type GameMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Game {
  readonly id: string;
  readonly playerX: string;
  readonly playerO?: string;
  readonly board: string;
  readonly currentPlayer?: Players | keyof typeof Players;
  readonly pointX?: number;
  readonly pointO?: number;
  readonly player1Name?: string;
  readonly player2Name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Game, GameMetaData>);
  static copyOf(source: Game, mutator: (draft: MutableModel<Game, GameMetaData>) => MutableModel<Game, GameMetaData> | void): Game;
}
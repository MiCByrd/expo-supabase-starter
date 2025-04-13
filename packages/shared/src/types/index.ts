export * from './database';
export * from './database.interface';

// Additional utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type WithId<T> = T & { id: string | number };
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'vixluxia-component-interactions';

const DEFAULT_STATE = {
  favorites: {},
  votes: {},
  comments: {},
};

function readState() {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return { ...DEFAULT_STATE, ...(parsed || {}) };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(nextState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function useComponentInteractions(componentId) {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    setState(readState());
  }, []);

  const persist = useCallback((updater) => {
    setState((current) => {
      const next = updater(current);
      writeState(next);
      return next;
    });
  }, []);

  const isFavorite = !!state.favorites[componentId];
  const vote = state.votes[componentId] || 0;
  const comments = useMemo(() => state.comments[componentId] || [], [componentId, state.comments]);

  const toggleFavorite = useCallback(() => {
    persist((current) => ({
      ...current,
      favorites: {
        ...current.favorites,
        [componentId]: !current.favorites[componentId],
      },
    }));
  }, [componentId, persist]);

  const setVote = useCallback((nextVote) => {
    persist((current) => ({
      ...current,
      votes: {
        ...current.votes,
        [componentId]: current.votes[componentId] === nextVote ? 0 : nextVote,
      },
    }));
  }, [componentId, persist]);

  const addComment = useCallback((body) => {
    const trimmed = body.trim();
    if (!trimmed) return;

    persist((current) => ({
      ...current,
      comments: {
        ...current.comments,
        [componentId]: [
          {
            id: `${componentId}-${Date.now()}`,
            author: 'You',
            body: trimmed,
            createdAt: new Date().toISOString(),
          },
          ...(current.comments[componentId] || []),
        ],
      },
    }));
  }, [componentId, persist]);

  return {
    isFavorite,
    vote,
    comments,
    toggleFavorite,
    setVote,
    addComment,
  };
}

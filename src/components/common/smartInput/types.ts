import { ReactElement } from 'react';

export interface SuggestionIdentifier {
  groupIndex: number;
  suggestionIndex: number;
}

export type GlobalSuggestionIdentifier = SuggestionIdentifier & {
  globalIndex: number;
};

export interface SuggestionDetails {
  key: string;
  title: string;
  icon?: HTMLElement | ReactElement;
  subtitle?: string;
}

export interface SuggestionGroup {
  key: string;
  label: string;
  suggestions: SuggestionDetails[];
}

export type SuggestionEventHandler = (
  groupIndex: number,
  suggestionIndex: number,
) => void;

export type SuggestionSelectHandler = (
  suggestion: SuggestionIdentifier,
) => void;

export interface SuggestionEventHandlers {
  mouseEnter?: SuggestionEventHandler;
  focus?: SuggestionEventHandler;
  click?: SuggestionEventHandler;
}

export interface SmartInputKeydownActions {
  [key: string]: (event: KeyboardEvent) => void;
}

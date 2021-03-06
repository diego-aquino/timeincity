import { SVGAttributes } from 'react';
import { NowRequest, NowResponse } from '@vercel/node';
import {
  DefaultTheme,
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components';

export type Optional<T> = { [P in keyof T]?: T[P] };

export type PossiblyNull<T> = { [P in keyof T]: T[P] | null };

export type Merge<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

export type RemoveFrom<L, R> = Pick<L, Exclude<keyof L, R>>;

export type OnlyOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> &
    Partial<Record<Exclude<keyof T, K>, undefined>>;
}[keyof T];

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export type Direction = 'up' | 'right' | 'down' | 'left';

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Address {
  cityName: string;
  stateCode: string;
  stateName?: string;
  countryCode: string;
  countryName?: string;
}

export type TimeZone = Here.TimeZone;

export interface QueryObject {
  [key: string]: string | undefined | null;
}

export type Action<T, V = void> = V extends void
  ? { type: T }
  : { type: T } & V;

export type SVGElementProps = SVGAttributes<SVGElement>;

export type ServerlessRequestHandler = (
  request: NowRequest,
  response: NowResponse,
) => Promise<NowResponse>;

export type StyledComponentsCSS = FlattenInterpolation<
  ThemedStyledProps<any, DefaultTheme>
>;

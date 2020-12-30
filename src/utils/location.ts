import { DateTime } from 'luxon';
import cityTimezones from 'city-timezones';

import { Address, Position, TimeZone } from 'typings';

const isClient = typeof window !== 'undefined';

type UserPositionResponse =
  | {
      status: 'SUCCESS';
      position: Position;
    }
  | {
      status: 'NOT_SUPPORTED' | 'FAILED';
      position: null;
    };

export async function requestUserPosition(): Promise<UserPositionResponse> {
  if (!isClient || !navigator.geolocation)
    return {
      position: null,
      status: 'NOT_SUPPORTED',
    };

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({
          position: { latitude, longitude },
          status: 'SUCCESS',
        });
      },
      () =>
        resolve({
          position: null,
          status: 'FAILED',
        }),
    );
  });
}

export function getTimeZoneData(timeZoneName: string): TimeZone {
  const localDateInMatchedTimeZone = DateTime.local().setZone(timeZoneName);
  const {
    zoneName,
    offset,
    offsetNameShort,
    offsetNameLong,
    isOffsetFixed,
    isInDST,
  } = localDateInMatchedTimeZone;

  const timeZone: TimeZone = {
    zoneName,
    offset,
    offsetNameShort,
    offsetNameLong,
    isOffsetFixed,
    isInDST,
  };

  return timeZone;
}

export function getAddressTimeZone(address: Address): TimeZone | null {
  const { countryName, state, city } = address;
  const locationResources = [countryName, state, city];

  while (locationResources.length > 0) {
    const searchString = locationResources.join(' ');

    const matchedLocations = cityTimezones.findFromCityStateProvince(
      searchString,
    );

    if (matchedLocations.length > 0) {
      const timeZoneName = matchedLocations[0].timezone;

      return getTimeZoneData(timeZoneName);
    }

    locationResources.pop();
  }

  return null;
}

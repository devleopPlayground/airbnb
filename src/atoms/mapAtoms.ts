import type { LocationType, RoomType } from '@/interface';
import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from '@/constants/mapPosition';
import { atom } from 'jotai';

const locationAtom = atom<LocationType>({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
  level: ZOOM_LEVEL,
});

const selectedRoomAtom = atom<RoomType | null>(null);

export { locationAtom, selectedRoomAtom };

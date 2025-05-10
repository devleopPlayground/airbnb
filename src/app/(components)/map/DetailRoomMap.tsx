'use client';

import Script from 'next/script';

import type { RoomType } from '@/interface';

import FullPageLoad from './FullPageLoad';
import useDetailMap from './hooks/useDetailMap';

type DetailRoomMapProps = {
  data?: RoomType;
};

const DetailRoomMap = ({ data }: DetailRoomMapProps) => {
  const { loadKakaoMap } = useDetailMap();

  return (
    <>
      {data ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={() => loadKakaoMap(data)}
        />
      ) : (
        <FullPageLoad />
      )}
      <div id="map" className="w-full h-[500px]" />
    </>
  );
};

export default DetailRoomMap;

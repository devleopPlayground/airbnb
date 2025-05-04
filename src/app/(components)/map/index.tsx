/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Script from 'next/script';
import useMap from './hooks/useMap';
import FullPageLoad from './FullPageLoad';

/*globalKakao*/
declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const { isSuccess, loadKakaoMap } = useMap();

  return (
    <>
      {isSuccess ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      ) : (
        <FullPageLoad />
      )}
      <div id="map" className="w-full h-screen" />
    </>
  );
};

export default Map;

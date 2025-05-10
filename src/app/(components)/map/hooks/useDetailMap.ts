import { ZOOM_LEVEL } from '@/constants/mapPosition';
import type { RoomType } from '@/interface';

const useDetailMap = () => {
  const loadKakaoMap = (data: RoomType) => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(data?.lat, data?.lng),
        level: ZOOM_LEVEL,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new window.kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      // 커스텀 오버레이에 표시할 내용입니다
      const content = `<span class="custom_overlay">${data?.price.toLocaleString()}</span>`;

      // 커스텀 오버레이가 표시될 위치입니다
      const position = new window.kakao.maps.LatLng(data?.lat, data?.lng);

      const imageSrc = '/images/marker-icon.png'; // 마커이미지의 주소입니다
      const imageSize = new window.kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(16, 45) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      const marker = new window.kakao.maps.Marker({
        position: position,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 커스텀 오버레이를 생성합니다
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
      });

      // 커스텀 오버레이가 지도 위에 표시되도록 설정합니다
      customOverlay.setMap(map);
    });
  };

  return {
    loadKakaoMap,
  };
};

export default useDetailMap;

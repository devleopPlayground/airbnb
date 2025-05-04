import { selectedRoomAtom } from '@/atoms/mapAtoms';
import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from '@/constants/mapPosition';
import useGetMapRooms from '@/hooks/api/rooms/useGetMapRooms';
import { useSetAtom } from 'jotai';

const useMap = () => {
  const { rooms, isSuccess } = useGetMapRooms();
  const setSelectedRoom = useSetAtom(selectedRoomAtom);

  const loadKakaoMap = () => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: ZOOM_LEVEL,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      rooms?.map((room) => {
        // 커스텀 오버레이에 표시할 내용입니다
        const content = `<span class="custom_overlay">${room.price.toLocaleString()}</span>`;

        // 커스텀 오버레이가 표시될 위치입니다
        const position = new window.kakao.maps.LatLng(room.lat, room.lng);

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

        // 마커에 클릭시 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedRoom(room);
        });

        // 지도 클릭시 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'click', () => {
          setSelectedRoom(null);
        });
      });
    });
  };

  return { isSuccess, loadKakaoMap };
};

export default useMap;

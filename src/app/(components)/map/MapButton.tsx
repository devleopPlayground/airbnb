import { BsMap } from 'react-icons/bs';

type MapButtonProps = {
  onClick: () => void;
};

const MapButton = ({ onClick }: MapButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm hover:shadow-lg mx-auto sticky bottom-12 cursor-pointer"
    >
      지도 표시하기 <BsMap className="text-xs" />
    </button>
  );
};

export default MapButton;

import { AiOutlineStar } from 'react-icons/ai';
import { BiSolidTree } from 'react-icons/bi';
import { FaHouseUser, FaSkiing, FaWater } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';
import { GiBarn, GiCampingTent, GiCaveEntrance, GiFamilyHouse, GiHolyOak, GiTreehouse } from 'react-icons/gi';
import { IoPartlySunnyOutline } from 'react-icons/io5';
import { MdDesignServices, MdOutlineWatchLater } from 'react-icons/md';
import { MdGolfCourse, MdOutlineBedroomChild, MdSurfing } from 'react-icons/md';
import { PiIslandFill } from 'react-icons/pi';
import { TbBeach, TbMoodKid, TbSwimming } from 'react-icons/tb';

export const CATEGORY = [
  '전망좋은',
  '자연',
  '동굴',
  '캠핑장',
  '방',
  '한옥',
  '해변',
  '국립공원',
  '수영장',
  '농장',
  '인기',
  '통나무집',
  '디자인',
  '호수',
  '스키',
  '키즈',
  '저택',
  '신규',
  '섬',
  '주택',
  '서핑',
  '골프장',
];

export const CATEGORY_DATA = [
  { title: '전망 좋음', icon: IoPartlySunnyOutline },
  { title: '자연', icon: GiHolyOak },
  { title: '동굴', icon: GiCaveEntrance },
  { title: '캠핑장', icon: GiCampingTent },
  { title: '방', icon: MdOutlineBedroomChild },
  { title: '한옥', icon: FaHouseUser },
  { title: '해변', icon: TbBeach },
  { title: '국립공원', icon: BiSolidTree },
  { title: '수영장', icon: TbSwimming },
  { title: '농장', icon: GiBarn },
  { title: '인기', icon: AiOutlineStar },
  { title: '통나무집', icon: GiTreehouse },
  { title: '디자인', icon: MdDesignServices },
  { title: '호수', icon: FaWater },
  { title: '스키', icon: FaSkiing },
  { title: '키즈', icon: TbMoodKid },
  { title: '저택', icon: GiFamilyHouse },
  { title: '신규', icon: MdOutlineWatchLater },
  { title: '섬', icon: PiIslandFill },
  { title: '주택', icon: FaHouseChimney },
  { title: '서핑', icon: MdSurfing },
  { title: '골프장', icon: MdGolfCourse },
];

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBroom,
  faBicycle,
  faPlug,
  faBusSimple,
  faCamera,
  faCar,
  faCarSide,
  faCashRegister,
  faCloudSun,
  faComputer,
  faFaceGrin,
  faGraduationCap,
  faHandshake,
  faHeart,
  faHouse,
  faHouseChimney,
  faHouseChimneyWindow,
  faIcons,
  faLocationDot,
  faChampagneGlasses,
  faMedal,
  faMotorcycle,
  faMusic,
  faObjectGroup,
  faPaw,
  faPeopleLine,
  faStar,
  faShirt,
  faToolbox,
  faUtensils,
  faSailboat,
  faScrewdriverWrench,
  faShapes,
  faTruck,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

const className =
  "size-20 flex justify-center items-center text-amber-300 w-full";

const iconMap: Record<string, JSX.Element> = {
  "57535": <FontAwesomeIcon icon={faHandshake} className={className} />,
  "57559": <FontAwesomeIcon icon={faLocationDot} className={className} />,
  "57618": <FontAwesomeIcon icon={faChampagneGlasses} className={className} />,
  "57648": <FontAwesomeIcon icon={faCamera} className={className} />,
  "57562": (
    <FontAwesomeIcon icon={faHouseChimneyWindow} className={className} />
  ),
  "57566": <FontAwesomeIcon icon={faBicycle} className={className} />,
  "57568": <FontAwesomeIcon icon={faUtensils} className={className} />,
  "57660": <FontAwesomeIcon icon={faCar} className={className} />,
  "57693": <FontAwesomeIcon icon={faShirt} className={className} />,
  "57703": <FontAwesomeIcon icon={faBroom} className={className} />,
  "57733": <FontAwesomeIcon icon={faComputer} className={className} />,
  "57737": <FontAwesomeIcon icon={faScrewdriverWrench} className={className} />,
  "57792": <FontAwesomeIcon icon={faObjectGroup} className={className} />,
  "57811": <FontAwesomeIcon icon={faSailboat} className={className} />,
  "57895": <FontAwesomeIcon icon={faPlug} className={className} />,
  "57903": <FontAwesomeIcon icon={faHouseChimney} className={className} />,
  "57907": <FontAwesomeIcon icon={faBusSimple} className={className} />,
  "57896": <FontAwesomeIcon icon={faToolbox} className={className} />,
  "58066": <FontAwesomeIcon icon={faWarehouse} className={className} />,
  "58136": (
    <FontAwesomeIcon icon={faHouseChimneyWindow} className={className} />
  ),
  "58153": <FontAwesomeIcon icon={faHouse} className={className} />,
  "58256": <FontAwesomeIcon icon={faChampagneGlasses} className={className} />,
  "58262": <FontAwesomeIcon icon={faHeart} className={className} />,
  "58330": <FontAwesomeIcon icon={faPeopleLine} className={className} />,
  "58378": <FontAwesomeIcon icon={faMotorcycle} className={className} />,
  "58389": <FontAwesomeIcon icon={faMusic} className={className} />,
  "58413": <FontAwesomeIcon icon={faStar} className={className} />,
  "58467": <FontAwesomeIcon icon={faCloudSun} className={className} />,
  "58499": <FontAwesomeIcon icon={faMedal} className={className} />,
  "58529": <FontAwesomeIcon icon={faPaw} className={className} />,
  "58914": <FontAwesomeIcon icon={faIcons} className={className} />,
  "61128": <FontAwesomeIcon icon={faCarSide} className={className} />,
  "61380": <FontAwesomeIcon icon={faTruck} className={className} />,
  "61792": <FontAwesomeIcon icon={faGraduationCap} className={className} />,
  "61793": <FontAwesomeIcon icon={faFaceGrin} className={className} />,
  "61890": <FontAwesomeIcon icon={faBook} className={className} />,
  "62677": <FontAwesomeIcon icon={faCashRegister} className={className} />,
  "62966": <FontAwesomeIcon icon={faBusSimple} className={className} />,
};

export function Icon({ code }: { code: string | number | string }) {
  const codeStr = String(code);
  return (
    iconMap[codeStr as string] || (
      <FontAwesomeIcon icon={faShapes} className={className} />
    )
  );
}

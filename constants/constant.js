import {Search } from "lucide-react";
import { GoHome, GoHomeFill } from "react-icons/go"
import { TbSquareRoundedPlus, TbSquareRoundedPlusFilled } from "react-icons/tb"
import {FaHeart, FaRegHeart, FaSearch} from  "react-icons/fa"

export const routes = [
  {
    label: "Home",
    path: "/",
    icon: GoHome,
    active: GoHomeFill,
  },
  {
    label: "Search",
    path: "/search",
    icon: Search,
    active: FaSearch,
  },
  {
    label: "Create",
    path: "/create",
    icon: TbSquareRoundedPlus,
    active: TbSquareRoundedPlusFilled,
  },

  {
    label: "Activity",
    path: "/activity",
    icon: FaRegHeart,
    active: FaHeart,
  },
];

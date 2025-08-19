import { CiHeart } from "react-icons/ci";
import { FaListCheck } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { FiMessageCircle, FiCode } from "react-icons/fi";

export const iconComponents = {
  CiHeart,
  FaListCheck,
  AiOutlineProduct,
  FiMessageCircle,
  QrIcon : FiCode,
} as const;

export type IconName = keyof typeof iconComponents;

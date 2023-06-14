import {
  CiAlignLeft,
  CiAlignRight,
  CiAlignCenterH,
  CiAlignCenterV,
  CiAlignTop,
  CiAlignBottom,
} from "react-icons/ci"

export const ALIGNS = [
  {
    id: "left" as const,
    label: "左揃え",
    Icon: CiAlignLeft,
  },
  {
    id: "h-center" as const,
    label: "左右中央揃え",
    Icon: CiAlignCenterH,
  },
  {
    id: "right" as const,
    label: "右揃え",
    Icon: CiAlignRight,
  },
  {
    id: "top" as const,
    label: "上揃え",
    Icon: CiAlignTop,
  },
  {
    id: "v-center" as const,
    label: "上下中央揃え",
    Icon: CiAlignCenterV,
  },
  {
    id: "bottom" as const,
    label: "下揃え",
    Icon: CiAlignBottom,
  },
]

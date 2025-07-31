import Image from "next/image"
import BlurImage from "../image"

export default function Gallery() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6">
      <BlurImage image='/home-gallery-1.jpg' rounded="none" />
      <BlurImage image='/home-gallery-2.jpg' rounded="none" />
      <BlurImage image='/home-gallery-3.jpg' rounded="none" />
      <BlurImage image='/home-gallery-4.jpg' rounded="none" />
      <BlurImage image='/home-gallery-5.jpg' className="w-full h-full object-cover hidden lg:block" rounded="none" />
      <BlurImage image='/home-gallery-6.jpg' className="w-full h-full object-cover hidden lg:block" rounded="none" />
    </div>
  )
}
import Image from "next/image";
import MainButton from "../main-button";
import BlurImage from "../image";

export default function StarterPack() {
  return (
    <section className="relative">
      <div className="lg:hidden">
        <BlurImage image="/starter-pack.jpg" />
      </div>
      <Image 
        src="/starter-desktop.jpg" 
        alt="" 
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto hidden lg:block" />
      <div className="main__layout mt-8 grid place-items-center">
        <MainButton text={ 'Shop now' } />
      </div>
    </section>
  )
}
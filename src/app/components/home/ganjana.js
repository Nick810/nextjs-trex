import Image from "next/image"

export default function Ganjana() {
  return (
    <section className="main__layout my-8">
      <h2 className="text-2xl lg:text-4xl mb-4 font-bold text-center lg:pt-[120px]">Meet with us at GANJANA</h2>
      <div className="grid place-items-center">
        <Image src="/ganjana-logo-bw.png" alt="" width={360} height={360} style={{ gridArea: "1/1" }} className="lg:hidden"/>
        <Image 
          src="/ganjana-bg-1.jpg" 
          alt="" 
          width={0}
          height={0}
          sizes="100vw"
          style={{ gridArea: "1/1" }}
          className="w-full h-auto hidden lg:block" />
        <div className="gradient-vignette z-10 h-full w-full lg:hidden" style={{ gridArea: "1/1" }}></div>
        <div className="ganjana-cta w-full items-center grid place-items-center">
          <a href="https://www.ganjana.org" target="_blank" className="btn bg-[#F2F2F2] text-fg w-full rounded-[4px] py-4 uppercase font-[300] hover:bg-black hover:border-white hover:border hover:text-white max-w-[480px]">Let&apos;s Go Now</a>
        </div>
      </div>
    </section>
  )
}
export default function About() {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold pl-[5%] relative top-1 z-20 uppercase lg:text-[72px] lg:translate-y-2">About Us</h2>
      <div className="grid relative">
        <div className="triangle-top-left z-10" style={{ gridArea: '1/1'}}></div>
        <div className="bg-[#F2F2F2] text-fg py-[20%] lg:py-[15%] px-[5%] grid md:place-items-center" style={{ gridArea: '1/1'}}>
          <h3 className="text-lg font-bold mb-4 text-fg text-align-left lg:text-4xl" >Family Owned & Operated Since 2014</h3>
          <p className="text-sm lg:text-lg">Founded in 2014 with the intention to share a sustainable regenerative organic farming practice, especially for the public and new generation to be aware of the importance of an community-minded environmentally friendly agriculture, which includes the appreciation to the beautiful relationship between natural ecosystems along with the preservation and development of Thailand&apos;s landraces and heirloom genetics.</p>
        </div>
        <div className="triangle-bottom-right z-10 absolute right-0 bottom-0" style={{ gridArea: '1/1'}}></div>
      </div>
    </section>
  )
}
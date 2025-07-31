import Link from "next/link"
import Image from "next/image"
import shortid from "shortid"

export default function AboutCanna({props, lang}) {
  return (
    <section className="my-16">
      <div className="flex justify-between items-center main__layout mb-4">
        <h2 className="text-2xl uppercase font-bold lg:text-4xl">About Canna</h2>
        <Link href="/" className="text-[#ACACAC]">view all</Link>
      </div>
      <ul className="grid gap-8 md:grid-cols-3 md:px-[5%]">
        {
          props.map(item => (
            <li key={ shortid.generate() } className="grid rounded-xl">
              <Link href={ `/${lang}/how-to/${item.id}` } className="grid">
                <div style={{ gridArea: "1/1" }}>
                  <Image 
                    src={{ ...item.image.responsiveImage }} 
                    alt="" 
                    width={0}
                    height={0}
                    className="w-full h-[240px] md:h-[320px] object-cover" />
                </div>
                <div className="gradient-bottom z-10" style={{ gridArea: "1/1" }}></div>
                <div className="flex flex-col	justify-end mt-2 main__layout z-10" style={{ gridArea: "1/1" }}>
                  <p className="text-sm text-[#8B8B8B] mt-2 mb-1">{ item.date }</p>
                  <h3 className="text-xl font-bold mb-2">{ item.title }</h3>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}
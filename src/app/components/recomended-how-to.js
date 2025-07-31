import Image from "next/image";
import shortid from "shortid";
import Link from "next/link";

export default function RecommendedHowTos({ props, id, lang }) {
  const data = props.data.allHowTos.filter(item => item.id !== id)
  
  return (
    <section className="mt-16">
      <h2 className="uppercase mb-4 font-bold">related how-tos</h2>
      <ul className="grid lg:grid-cols-2 gap-6">
        {
          data.splice(0, 4).map(item => (
            <li key={shortid.generate()}>
              <Link href={`/${lang}/how-to/${item.id}`}  className="grid grid-cols-[64px_1fr] gap-3">
                <Image 
                  src={{ ...item.image.responsiveImage }}
                  alt="" 
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-[64px] object-cover block rounded-sm" />
                <h3 className="text-sm">{ item.title }</h3>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}
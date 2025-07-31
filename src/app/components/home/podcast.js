import shortid from "shortid"
import { site } from '../../json/site-config.json';
import Image from "next/image";

export default function Podcast() {
  return (
    <div className="overflow-x-hidden main__layout my-8">
      <div className="flex justify-between items-center pr-[5%] mb-4">
        <h2 className="text-2xl lg:text-4xl uppercase font-bold">Podcast</h2>
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {
          site.podcast.map(item => (
            <li key={ shortid.generate() } className="carousel-item flex flex-col w-full gap-2">
              <a href={item.url} target="_blank" rel="noopener noreferrer"> 
                <div className="flex flex-col justify-end min-h-[200px] lg:min-h-[280px] p-4 border-[#A1A1A1] border rounded-md mb-1 relative">
                  <Image src='/logo.png' alt="" width={ 140 } height={140} className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[80%]" />
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[#8B8B8B] font-light text-xs mb-1">rec: { item.createdOn }</p>
                      <h3 className="text-sm">{ item.title }</h3>
                    </div>
                    <div className="w-10 h-10 bg-[#f2f2f2] rounded-full grid place-items-center">
                      <div className="arrow-right translate-x-[0.5px]"></div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
import Image from "next/image";
import shortid from "shortid";

export default function Reviews({ props }) {
  
  return (
    <div className="">
      <h2 className="text-2xl lg:text-4xl mb-4 font-bold uppercase pl-[5%]">Let&apos;s hear from our customers</h2>
      <div className="grid relative">
        <ul className="gap-8 slideshow flex flex-row" style={{ gridArea: "1/1" }}>
          {
            props.map(item => (
              <li key={shortid.generate()} className="text-fg p-4 rounded-lg grid flex-none w-400px test">
                <Image src="/quot.png" alt="" width={ 40 } height={ 40 } />
                <div className="mt-4">
                  <h3 className="font-bold text-xl mb-2 text-fg">{item.name}</h3>
                  <p className="max-w-[480px]">{item.review}</p>
                </div>
              </li>
            ))
          }
          {
            props.map(item => (
              <li key={shortid.generate()} className="text-fg p-4 rounded-lg grid flex-none w-400px">
                <Image src="/quot.png" alt="" width={ 40 } height={ 40 } />
                <div className="mt-4">
                  <h3 className="font-bold text-xl mb-2 text-fg">{item.name}</h3>
                  <p className="max-w-[480px]">{item.review}</p>
                </div>
              </li>
            ))
          }
        </ul>
        <div style={{ gridArea: "1/1" }} className="gradient-right z-10 w-[40%] h-[100%] absolute right-0"></div>
      </div>
    </div>
  )
}
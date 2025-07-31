import Link from "next/link"
import { capitalize } from "../libs/utils"

export default function Breadcrumb({props, title}) {
  const { lang } = props;
  
  return (
    <nav>
      <Link href={`/${lang}`} className="text-sm lowercase underline text-fg">Home</Link>
      <span className="lowercase font-thin text-xs"> / </span>
      { props['how-to'] ? 
        <>
          <Link href={`/${lang}/how-to/`} className="text-sm lowercase font-thin underline text-fg">{ `how-to` }</Link> 
          <span className="lowercase font-thin text-xs"> / </span>
        </>
        : 
        null
      }
      { props.product ? 
        <Link href={`/${lang}/collection/${props.collection}`} className="text-sm lowercase font-thin underline text-fg">{ capitalize(props.collection) }</Link> 
        : 
        <span className="lowercase font-thin text-sm text-fg">{ !title ? capitalize(props.collection) : title }</span> 
      }
      {
        props.product ?
        <>
          <span className="lowercase font-thin text-sm"> / </span>
          <span className="lowercase font-thin text-sm">{capitalize(props.product)}</span>
        </> : null
      }
    </nav>
  )
}
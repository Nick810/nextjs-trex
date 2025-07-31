// import { Blurhash } from "react-blurhash"
import { memo } from "react"

export default memo(function ProductImage({ children }) {
  return (
    <div className="grid relative">
      {/* <Blurhash
        style={{ height: '100%', width: '100%', gridArea: "1/1" }}
        hash="T8Av]wE3040{xa-B06od%G}HSvJ*"
        resolutionX={32}
        resolutionY={32}
        punch={1}
      /> */}
      <div className="overflow-hidden relative" style={{ gridArea: '1/1' }}>
        <div className="pt-[100%]"></div>
        { children }
      </div>
    </div>
  )
});
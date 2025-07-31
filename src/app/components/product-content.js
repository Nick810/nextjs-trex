export default function AdditionalDesc({ k }) {
  
  return (
    <li 
      className="text-fg!"
      >
        <button 
          className="w-full border py-4 px-6 rounded-sm" >
          <div 
            className="cursor-pointer flex flex-row justify-between items-center" 
          >
            <h3 className="text-md uppercase">{k[0].replaceAll('_', ' ')}</h3>
          </div>
          <div className={`grid transition-[grid-template-rows] ease-[cubic-bezier(0.175, 0.885, 0.32, 1.275)]	duration-300 rid-rows-[1fr] text-fg`}>
            <div 
              dangerouslySetInnerHTML={{__html: k[1] }} 
              className={ `overflow-y-hidden show` } />
          </div>
        </button>
      </li>
  )
}

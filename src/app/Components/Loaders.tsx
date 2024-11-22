import load from "../styles/design.module.css"

const Loaders = () => { 

  return (
    <div>
        <svg 
        className={`${load.pl}`} width="240" height="240" viewBox="0 0 240 240">
            <circle className={`${load.pl__ring} ${load.plp_ring__a}`} cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
            <circle className={`${load.pl__ring} ${load.pl__ring__b}`} cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
            <circle className={`${load.pl__ring} ${load.pl__ring__c}`} cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
            <circle className={`${load.pl__ring} ${load.pl__ring__d}`} cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
        </svg>
    </div>
  )
}
export default Loaders
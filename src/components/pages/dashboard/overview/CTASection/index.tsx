import Image from "next/image";

export default function CTASection() { 
  return ( 
    <div className="w-full flex gap-4"> 
      <div 
        className="basis-[57%] p-6 rounded-2xl text-white shadow relative overflow-hidden h-48"
        style={{ background: "linear-gradient(135deg, #93C5FD 0%, #1D4ED8 100%)" }}
      > 
        <div className="relative z-10">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-4">
            <Image src="/images/overview/help-icon.svg" alt="Help" width={20} height={20} />
          </div>
          <h3 className="text-lg font-semibold mb-1">Need help?</h3> 
          <p className="text-sm opacity-90 mb-4">Please check our docs</p> 
          <button className="px-4 py-2 bg-white text-blue-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"> 
            Button 
          </button> 
        </div>
        
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
          <Image 
            src="/images/overview/building-3d-icon.svg" 
            alt="3D Building" 
            width={150} 
            height={200}
            className="opacity-90"
          />
        </div>
      </div> 
 
      <div 
        className="basis-[43%] p-6 rounded-2xl text-white shadow relative h-48"
        // style={{ background: "linear-gradient(135deg, #93C5FD 0%, #1D4ED8 100%)" }}
      > 
        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4">
          <Image src="/images/overview/info-icon.svg" alt="Info" width={40} height={30} />
        </div>
        <h3 className="text-lg text-blue-700 font-semibold mb-1">Second CTA Banner</h3> 
        <p className="text-sm text-gray-400 opacity-90 mb-4">Please check our docs</p> 
        <button 
          className="px-4 py-2 bg-blue-700 rounded-full text-sm font-medium text-white hover:bg-gray-50 hover:text-blue-700 transition-colors"
        > 
          Button 
        </button> 
      </div> 
    </div> 
  ); 
}

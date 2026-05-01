import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
  return (
    <div className="h-screen bg-white text-black relative overflow-hidden">
      {/* Desktop K25 Logo */}
      <div className="absolute top-[50px] right-24 hidden md:block">
        <Image src={"/assets/k25/k25.svg"} alt='k25' width={74} height={43} />
      </div>

      {/* Mobile K25 Logo */}
      <div className="absolute top-4 right-4 md:hidden">
        <Image src={"/assets/k25/k25.svg"} alt='k25' width={50} height={29} />
      </div>

      {/* Desktop Letter Tiles */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-[20px] left-[46px] w-[45px] h-[45px] bg-[#5a7121]/75 border-[4px] border-[#e6e6e6] rounded-lg"></div>
        <div className="absolute top-[70px] left-[24px] w-[45px] h-[45px] bg-[#de95ca]/75 border-[4px] border-[#e6e6e6] rounded-lg"></div>
        <div className="absolute top-[110px] left-36 w-[45px] h-[45px] bg-[#5a7121]/75 border-[4px] border-[#e6e6e6] rounded-lg"></div>

        <div className="absolute top-[90px] left-72">
          <div className="flex gap-3">
            <div className="w-[45px] h-[45px] bg-[#de95ca]/75 border-[4px] text-[32px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">
              K
            </div>
            <div className="w-[45px] h-[45px] bg-[#a5c1d9] border-[4px] text-[32px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
              E
            </div>
            <div className="w-[45px] h-[45px] bg-[#5a7121]/75 border-[4px] text-[32px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
              I
            </div>
          </div>
        </div>

        <div className="absolute top-[180px] left-[520px] transform -translate-x-1/2">
          <div className="w-[45px] h-[45px] bg-[#a5c1d9] text-[32px] border-[4px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
            E
          </div>
        </div>

        <div className="absolute top-[220px] left-80">
          <div className="flex flex-col gap-1">
            <div className="w-[45px] h-[45px] ml-4 text-[32px] bg-[#5a7121]/75 border-[4px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">
              Z
            </div>
            <div className="w-[45px] h-[45px] bg-[#de95ca]/75 text-[32px] border-[4px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">R</div>
            <div className="w-[45px] h-[45px] ml-4 bg-[#5a7121]/75 border-[4px] text-[32px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">
              W
            </div>
          </div>
        </div>

        <div className="absolute top-[320px] left-[490px]">
          <div className="w-[45px] h-[45px] bg-[#5a7121]/75 text-[32px] border-[4px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">
            K
          </div>
        </div>

        <div className="absolute bottom-[354px] left-[390px]">
          <div className="flex gap-6">
            <div className="w-[45px] h-[45px] bg-[#a5c1d9] text-[32px] border-[4px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
              O
            </div>
            <div className="w-[45px] h-[45px] bg-[#de95ca]/75 -mt-4 text-[32px] border-[4px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">R</div>
            <div className="w-[45px] h-[45px] bg-[#a5c1d9] mt-4 text-[32px] border-[4px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
              S
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Letter Tiles - Simplified arrangement */}
      <div className="absolute inset-0 md:hidden">
        {/* Top scattered tiles */}
        <div className="absolute top-16 left-4 w-[40px] h-[40px] bg-[#5a7121]/75 border-[3px] border-[#e6e6e6] rounded-lg"></div>
        <div className="absolute top-20 right-12 w-[40px] h-[40px] bg-[#de95ca]/75 border-[3px] border-[#e6e6e6] rounded-lg"></div>
        
        {/* KEI letters - smaller for mobile */}
        <div className="absolute top-32 left-8">
          <div className="flex gap-2">
            <div className="w-[40px] h-[40px] bg-[#de95ca]/75 border-[3px] text-[24px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">
              K
            </div>
            <div className="w-[40px] h-[40px] bg-[#a5c1d9] border-[3px] text-[24px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
              E
            </div>
            <div className="w-[40px] h-[40px] bg-[#5a7121]/75 border-[3px] text-[24px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
              I
            </div>
          </div>
        </div>

        {/* Right side letters */}
        <div className="absolute top-40 right-8">
          <div className="flex flex-col gap-1">
            <div className="w-[40px] h-[40px] bg-[#5a7121]/75 border-[3px] text-[24px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">
              Z
            </div>
            <div className="w-[40px] h-[40px] bg-[#a5c1d9] text-[24px] border-[3px] border-[#e6e6e6] rounded-full flex items-center justify-center font-bold">
              E
            </div>
            <div className="w-[40px] h-[40px] bg-[#de95ca]/75 text-[24px] border-[3px] border-[#e6e6e6] rounded-lg flex items-center justify-center font-bold">
              R
            </div>
          </div>
        </div>

        {/* Bottom scattered tiles */}
       
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start pt-56 md:pl-80 min-h-screen px-4">
        <div className="text-center mb-4 leading-tight">
          <p className="text-[14px] md:text-[16px] font-semibold text-gray-600 mb-4">Inviting you to join keizer</p>
          <h1 className="text-[28px] md:text-[40px] font-bold mb-4">
            Summer 2026
            <br />
            <span className="font-semibold text-[28px] md:text-[40px]">APPLICATIONS</span>
            <br />
            <div className='flex text-center items-center justify-center space-x-2'>
              <span className="font-semibold text-[28px] md:text-[40px]">ARE</span>{" "}
              <Image 
                src={"/assets/k25/open.svg"} 
                className="mt-2" 
                alt="k25" 
                width={90} 
                height={35}
                sizes="(max-width: 768px) 90px, 127px"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90px',
                }}
              />
            </div>
          </h1>
        </div>

        <Link
          href="/k25/form"
          className="
            w-[120px] md:w-[140px] h-[40px] md:h-[43px]
            z-50
            flex items-center justify-center
            px-6 md:px-8 py-3 md:py-4
            bg-white
            text-black text-lg md:text-xl font-semibold
            rounded-full
            border-[0.4px] border-[#b3b3b3]
            outline outline-[0.4px] outline-[#bababa] outline-offset-2  
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            text-[14px] md:text-[16px]
            transition duration-300 ease-in-out
            font-inter
            gap-1 md:gap-2
          "
        >
          NEXT
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>

      {/* Skills Image - Desktop */}
      <div className="absolute bottom-2 px-12 mx-auto h-64 hidden md:block">
        <Image src={"/assets/k25/skills.svg"} alt='k25' width={1300} height={100} />
      </div>

      {/* Skills Image - Mobile */}
      <div className="absolute bottom-2 px-4 mx-auto h-32 md:hidden w-full">
        <Image 
          src={"/assets/k25/skills.svg"} 
          alt='k25' 
          width={350} 
          height={50}
          className="w-full h-auto max-w-[350px] mx-auto"
        />
      </div>
    </div>
  )
}

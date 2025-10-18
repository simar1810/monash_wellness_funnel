import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return <section className="w-full min-h-screen bg-[url('/app_bg.png')] bg-center flex justify-center items-center py-[4rem] px-6 md:px-12 ">
    <div className="flex flex-col lg:flex-row justify-between items-center h-full text-white gap-[2rem] md:gap-5 xl:gap-[5rem]">
      <div className="xl:min-w-1/2 flex flex-col items-center lg:items-start xl:pl-6 md:mt-[10rem] lg:mt-0 text-center lg:text-left">
                <h1 className="text-[1.2rem] md:text-[1.5rem] lg:text-[2.5rem] xl:text-[3rem] font-bold lg:mb-7 xl:mb-12 lg:leading-[3.5rem] ">Download the <br />
                    <span className='md:text-[2.7rem] text-[2rem] xl:text-[3rem] text-white opacity-100'>Monash Wellness App</span>
                </h1>
                <p className="text-sm md:text-xl mb-5 opacity-70 ">Begin your journey Towards Making People Healthy</p>
        <div className="flex justify-between items-center gap-5 mb-5">
          <Link href="https://play.google.com/store/apps/details?id=com.wellnessz.monash" target="_blank">
            <Image src="/playstore.png" alt="Google Store" width={150} height={40} className="cursor-pointer w-2xs" />
          </Link>
          <Link href="https://apps.apple.com/us/app/monash-wellness/id6751632386" target="_blank">
            <Image src="/appStore.png" alt="App Store" width={150} height={60} className="cursor-pointer w-2xs" />
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center mr-2 lg:mr-12">
        <Image
          src="/mockup.png"
          alt="Swasthya Fitness Screens"
          width={900}
          height={900}
          className="w-full self-center lg:w-lg xl:w-lg 2xl:max-w-3xl mx-auto object-contain" />
      </div>
    </div>
  </section>
}
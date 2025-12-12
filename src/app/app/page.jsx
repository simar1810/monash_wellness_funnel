import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return <section className="w-full min-h-screen bg-[url('/app_bg.png')] bg-center flex justify-center items-center py-[4rem] px-6 md:px-12 ">
    <div className="flex flex-col xl:flex-row justify-between items-center h-full text-white gap-[2rem] xl:gap-[5rem]">
      <div className="xl:min-w-1/2 flex flex-col items-center xl:items-start xl:pl-6 md:mt-[10rem] xl:mt-0 text-center xl:text-left">
        <p className="text-sm md:text-xl lg:text-3xl xl:text-xl mb-5 opacity-70 ">Begin your journey Towards Making People Healthy</p>
        <div className="flex justify-between items-center gap-5 mb-5">
          <Link href="https://play.google.com/store/apps/details?id=com.wellnessz.monash&hl=en" target="_blank">
            <Image src="/playstore.png" alt="Google Store" width={150} height={40} className="cursor-pointer w-2xs" />
          </Link>
          <Link href="https://apps.apple.com/ar/app/monash-wellness/id6751632386" target="_blank">
            <Image src="/appStore.png" alt="App Store" width={150} height={60} className="cursor-pointer w-2xs" />
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center mr-2 md:mr-12">
        <Image
          src="/HWD_Mockup.png"
          alt="HWD Mockup"
          width={900}
          height={900}
          className="w-full self-center lg:max-w-4xl xl:w-lg 2xl:max-w-3xl object-contain" />
      </div>
    </div>
  </section>
}

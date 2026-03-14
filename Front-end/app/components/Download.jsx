import { Smartphone } from "lucide-react";
import Image from "next/image";

const AppDownload = () => {
  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-[#F8D6A4] to-[#D4A574] rounded-lg my-8">
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Download Our App
          </h2>

          <p className="text-gray-800 mb-4">
            Get exclusive offers and faster checkout!
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              width={160}
              height={50}
              className="h-12 w-auto"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              width={160}
              height={50}
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Right Icon Section */}
        <div className="w-48 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition duration-300">
          <Smartphone className="w-20 h-20 text-[#D4A574]" />
        </div>

      </div>
    </section>
  );
};

export default AppDownload;

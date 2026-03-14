import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      
      {/* Newsletter Section */}
      <div className="bg-[#F8D6A4] dark:bg-[#8B6F47] py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Get the latest updates on new products and upcoming sales
            </p>
          </div>

          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="h-9 px-3 rounded-md border bg-white dark:bg-gray-800 md:w-80"
            />
            <button
              type="submit"
              className="h-9 px-4 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About */}
          <div>
            <h4 className="text-lg font-bold mb-4">About Myntra</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your one-stop destination for the latest fashion trends.
              Shop from a wide range of clothing, footwear, and accessories.
            </p>

            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-[#F8D6A4] transition" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-[#F8D6A4] transition" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-[#F8D6A4] transition" />
              <Youtube className="h-5 w-5 cursor-pointer hover:text-[#F8D6A4] transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/men" className="hover:text-[#F8D6A4] transition">Men's Fashion</Link></li>
              <li><Link href="/women" className="hover:text-[#F8D6A4] transition">Women's Fashion</Link></li>
              <li><Link href="/kids" className="hover:text-[#F8D6A4] transition">Kids Fashion</Link></li>
              <li><Link href="/top-rated" className="hover:text-[#F8D6A4] transition">Top Rated Products</Link></li>
              <li><Link href="/trending" className="hover:text-[#F8D6A4] transition">Trending Now</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#F8D6A4] transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#F8D6A4] transition">Track Order</a></li>
              <li><a href="#" className="hover:text-[#F8D6A4] transition">Return Policy</a></li>
              <li><a href="#" className="hover:text-[#F8D6A4] transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#F8D6A4] transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                support@myntra.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                1800-123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                123 Fashion Street, Mumbai, India
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Mon-Sat: 9AM - 6PM
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          
          <p>© 2026 Myntra. All rights reserved.</p>

          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-[#F8D6A4] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#F8D6A4] transition">Terms of Service</a>
            <a href="#" className="hover:text-[#F8D6A4] transition">Sitemap</a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;

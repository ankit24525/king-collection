import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Toaster} from "react-hot-toast";
import Providers from "./providers";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">

        <Providers>
          {/* HEADER */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />
           <Toaster position="top-right" />
        </Providers>

      </body>
    </html>
  );
}
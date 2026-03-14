import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Men",
    href: "/men",
    img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500",
  },
  {
    title: "Women",
    href: "/women",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
  },
  {
    title: "Kids",
    href: "/kids",
    img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",
  },
  {
    title: "Footwear",
    href: "/men",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
  },
  {
    title: "Accessories",
    href: "/men",
    img: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=500",
  },
  {
    title: "Ethnic Wear",
    href: "/women",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
  },
];

const CategoryGrid = () => {
  return (

    <section  className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
            Shop by Category
        </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => (
        <Link key={index} href={category.href} className="group">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">

            {/* FIXED IMAGE */}
            <Image
              src={category.img}
              alt={category.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">
                {category.title}
              </h3>
            </div>

          </div>
        </Link>
      ))}
    </div>
    </section>
  
  );
};

export default CategoryGrid;

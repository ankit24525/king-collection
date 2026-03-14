import { Truck, RefreshCw, Shield, Clock } from "lucide-react";

const features = [
  {
    title: "Free Shipping",
    description: "On orders above ₹999",
    icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "30-day return policy",
    icon: RefreshCw,
  },
  {
    title: "Secure Payment",
    description: "100% secure transactions",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    description: "Always here to help",
    icon: Clock,
  },
];

const Services = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <Icon className="h-12 w-12 text-[#F8D6A4] mb-4" />
              <h3 className="font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;

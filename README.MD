🛍️ KingCollection

KingCollection is a modern full-stack e-commerce platform built using Next.js, Node.js, Express, and MongoDB.
The project includes a user shopping interface and a powerful admin dashboard to manage products, images, and sections.

This project demonstrates a production-style MERN architecture with authentication, product management, cart, wishlist, and Cloudinary image upload.

---

🚀 Features

👤 User Features

- Browse products by category
- Product sections on homepage:
  - Trending
  - Featured
  - New Arrivals
  - Best Sellers
  - Deals of the Day
- Product details page
- Add products to cart
- Add products to wishlist
- Product size selection
- Product images with Cloudinary
- Responsive design for mobile and desktop

---

👑 Admin Features

- Admin login system
- Admin dashboard
- Add products
- Edit products
- Delete products
- Upload product images
- Manage product sections
- Product ranking system
- Multiple product sizes
- Stock management per size
- Image preview before upload
- Homepage sections limited to maximum 12 products

---

🧱 Tech Stack

Frontend

- Next.js
- React
- Tailwind CSS
- Axios
- Lucide Icons

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

Image Storage

- Cloudinary

Authentication

- JWT (JSON Web Token)

Tools

- Git
- GitHub

---

📂 Project Structure

king-collection

│

├── backend
│   ├── controllers
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── cartController.js
│   │   └── adminController.js
│   │
│   ├── models
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── routes
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── cartRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── config
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   └── server.js
│
├── front-end
│   ├── app
│   │   ├── admin
│   │   ├── cart
│   │   ├── wishlist
│   │   ├── login
│   │   └── page.jsx
│   │
│   ├── components
│   │   ├── HeroSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Trending.jsx
│   │   ├── Arrivals.jsx
│   │   ├── Deals.jsx
│   │   ├── Category.jsx
│   │   └── Navbar.jsx
│   │
│   └── lib
│       └── api.js
│
├── screenshots
│
├── .gitignore
└── README.md

---

⚙️ Installation

1️⃣ Clone the repository

git clone https://github.com/ankit24525/king-collection.git

cd king-collection

---

📦 Install Dependencies

Backend

cd backend
npm install

Frontend

cd front-end
npm install

---

▶ Run the Project

Start Backend

cd backend
npm run dev

Start Frontend

cd front-end
npm run dev

Open browser:

http://localhost:3000

---

🌐 Environment Variables

Create a ".env" file inside backend

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

---

🖼️ Image Upload

Images are uploaded using Cloudinary.

Admin can:

- Upload product images
- Preview images before uploading
- Manage multiple product images

---

🛒 Product System

Products support:

- Category
- Section
- Ranking
- Sizes
- Stock per size
- Images
- Price

Example product:

Nike Air Max

Size S → ₹1999
Size M → ₹2099
Size L → ₹2199

---

📊 Product Sections

Homepage sections show maximum 12 products:

- Trending
- Featured
- New Arrivals
- Best Sellers
- Deals

Products are sorted by:

Newest → Oldest

---

📸 Screenshots

Add screenshots here for better GitHub presentation.

Example:

screenshots/homepage.png
screenshots/admin-dashboard.png
screenshots/product-page.png

Example markdown:

"Homepage" (screenshots/homepage.png)

---

🔮 Future Improvements

- Payment integration (Stripe / Razorpay)
- Order management system
- Product reviews
- Product ratings
- Email notifications
- Admin analytics dashboard
- Product filters (price / size / brand)

---

👨‍💻 Author

Ankit

MCA Student
Full-Stack Developer

GitHub:
https://github.com/ankit24525

---

⭐ Support

If you like this project, consider giving it a star ⭐ on GitHub.
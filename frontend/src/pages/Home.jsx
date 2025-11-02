import { useEffect, useState } from "react";
import API from "../services/api";

// 1.  DEFINING PLACEHOLDER IMAGES
const PLACEHOLDERS = [
  "/img/GulabJamun.jpeg", 
  "/img/Rasgulla.jpeg",        
  "/img/ChocolateBar.jpeg",        
  "/img/Laddoo.jpeg",
  "/img/CupCake.jpeg"
];


export default function Home() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    API.get("/sweets")
      .then(res => setSweets(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center pb-20 font-sans">

      {/* HERO */}
      <div className="w-full py-20 bg-gradient-to-r from-amber-200 to-yellow-100 text-center shadow-inner">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
          Sweet Haven
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Authentic handcrafted sweets made fresh every day, using traditional
          recipes and pure ingredients.
        </p>
      </div>

      <div className="w-full max-w-6xl px-6 mt-14">

        {/* ABOUT */}
        <section className="bg-white shadow-xl border-l-8 border-yellow-500 rounded-xl p-10 mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            For generations, Sweet Haven has crafted sweets the traditional way 
            slow-cooked, hand-shaped, and made fresh daily. We use pure ghee, rich flavors,
            and time-honored methods to deliver sweetness that feels like home.
          </p>
        </section>

        {/* WHY CHOOSE US */}
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why Choose Us</h3>
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-yellow-500">
            
            <h4 className="font-semibold text-lg text-gray-900 mb-1">Pure Ingredients</h4>
            <p className="text-sm text-gray-600">Premium ghee, fresh milk, no artificial flavors.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-yellow-500">
           
            <h4 className="font-semibold text-lg text-gray-900 mb-1">Fresh Daily</h4>
            <p className="text-sm text-gray-600">Small batch, freshly prepared every morning.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-yellow-500">
            
            <h4 className="font-semibold text-lg text-gray-900 mb-1">Traditional Craft</h4>
            <p className="text-sm text-gray-600">Recipes perfected through generations.</p>
          </div>

        </section>

        {/* SWEETS PREVIEW with dynamic images */}
        {sweets && sweets.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Favourites</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Added index (i) to the map function */}
              {sweets.slice(0, 6).map((s, i) => {
                
                // 2.  DYNAMIC IMAGE SELECTION LOGIC
                const imageUrl = s.image || PLACEHOLDERS[i % PLACEHOLDERS.length];

                return (
                  <div key={s.id} className="bg-white rounded-lg shadow-md p-3 w-44 text-center hover:shadow-xl transition-shadow">
                    
                    {/*  IMAGE CONTAINER: 'aspect-square' makes it a perfect square */}
                    <div className="aspect-square w-full overflow-hidden rounded-md border border-gray-100 mb-3">
                      <img
                        src={imageUrl} 
                        alt={s.name}
                        // 'object-cover' makes the image fill the square completely
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <p className="text-base font-semibold text-gray-800 truncate">
                      {s.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-sm mt-8 px-6">
        Sweet Haven - crafted with love & purity.
      </footer>
    </div>
  );
}
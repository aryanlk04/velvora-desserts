import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star, Heart, ChefHat, Sparkles, Coffee, Instagram } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

// Assets
import velvoraLogo from "@assets/velvora_1781446789857.PNG";
import biscoffImg from "@assets/biscoff_1781446961031.jpg";
import blueberryImg from "@assets/bluberry_1781446961032.jpg";
import brownieImg from "@assets/brownie_1781446961032.jpg";
import churrosImg from "@assets/churros_1781446961032.jpg";
import mangoImg from "@assets/mango_1781446961032.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="relative z-10 flex items-center gap-2 group">
             <img 
               src={velvoraLogo} 
               alt="VELVORA Logo" 
               className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
             />
             <span className="font-serif font-bold text-xl tracking-wider text-foreground">VELVORA</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium tracking-wide">
            <button onClick={() => scrollTo("hero")} className="hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollTo("menu")} className="hover:text-primary transition-colors">Menu</button>
            <button onClick={() => scrollTo("reviews")} className="hover:text-primary transition-colors">Reviews</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button>
            <button 
              onClick={() => scrollTo("menu")}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden relative z-10 p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 bg-background/95 backdrop-blur-lg pt-24 pb-8 px-6 flex flex-col gap-6 shadow-xl md:hidden z-0 border-b border-border"
            >
              <button onClick={() => scrollTo("hero")} className="text-xl font-serif text-left border-b border-border/50 pb-4">Home</button>
              <button onClick={() => scrollTo("about")} className="text-xl font-serif text-left border-b border-border/50 pb-4">About</button>
              <button onClick={() => scrollTo("menu")} className="text-xl font-serif text-left border-b border-border/50 pb-4">Menu</button>
              <button onClick={() => scrollTo("reviews")} className="text-xl font-serif text-left border-b border-border/50 pb-4">Reviews</button>
              <button onClick={() => scrollTo("contact")} className="text-xl font-serif text-left border-b border-border/50 pb-4">Contact</button>
              <button 
                onClick={() => scrollTo("menu")}
                className="bg-primary text-primary-foreground py-4 rounded-lg font-medium tracking-wide mt-4"
              >
                Order Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#2d180b]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={brownieImg} 
            alt="Delicious Brownie" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform hover:scale-100 transition-transform duration-[20s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f07] via-[#2d180b]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f07] via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 py-20 text-[#FAF6F0]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 border border-[#C8965A]/30 rounded-full text-[#C8965A] text-sm tracking-widest uppercase mb-6 backdrop-blur-sm">
              Desserts That Stay With You
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 tracking-tight text-white drop-shadow-lg">
              Handcrafted<br/>
              <span className="text-[#C8965A] italic font-medium">Desserts.</span><br/>
              Made With Love.
            </h1>
            <p className="text-lg md:text-xl text-[#F7F0E8]/80 mb-10 max-w-2xl font-light leading-relaxed">
              Premium brownies, cheesecakes, tiramisu and signature desserts crafted fresh for every order. Experience opulent warmth in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollTo("menu")}
                className="bg-[#C8965A] text-[#2d180b] px-8 py-4 rounded-full font-medium tracking-wide hover:bg-white transition-all duration-300 shadow-lg text-center"
              >
                Order Now
              </button>
              <button 
                onClick={() => scrollTo("menu")}
                className="border-2 border-[#C8965A] text-[#C8965A] px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#C8965A] hover:text-[#2d180b] transition-all duration-300 text-center"
              >
                View Menu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-[40px] blur-xl z-0"></div>
              <img 
                src={biscoffImg} 
                alt="VELVORA Biscoff Cheesecake" 
                className="relative z-10 w-full rounded-2xl shadow-xl aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary rounded-full flex items-center justify-center text-primary-foreground p-6 text-center shadow-lg z-20 animate-[spin_20s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="font-serif text-sm tracking-[0.2em] uppercase fill-current">
                    <textPath href="#curve">Handcrafted with love • Pure Indulgence •</textPath>
                  </text>
                </svg>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-primary mb-8 rounded-full"></div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                VELVORA was created with a simple goal — to bring premium café-style desserts to every celebration. Every dessert is freshly handcrafted using carefully selected ingredients, ensuring rich flavors, beautiful presentation, and unforgettable moments.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: ChefHat, title: "Freshly Made", desc: "Crafted to order for maximum flavor" },
                  { icon: Coffee, title: "Premium Ingredients", desc: "Only the finest cocoa and pure butter" },
                  { icon: Heart, title: "Crafted With Care", desc: "Every detail meticulously perfected" },
                  { icon: Star, title: "Home-Based Boutique", desc: "Artisan quality from our kitchen to yours" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <feature.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground font-serif">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-24 md:py-32 bg-[#FAF6F0] border-y border-border/50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">Indulge Yourself</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Signature Collection</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { category: "Brownies", name: "Fudgy Brownies", desc: "Deep fudgy layers of pure chocolate bliss", price: 280, img: brownieImg },
              { category: "Cheesecakes", name: "Baked Cheesecake", desc: "Classic New York style, perfectly baked", price: 420, img: mangoImg },
              { category: "Cheesecakes", name: "Lotus Biscoff", desc: "Spiced Biscoff crust with silky caramel filling", price: 380, img: biscoffImg },
              { category: "Cheesecakes", name: "Blueberry Bliss", desc: "Creamy cheesecake crowned with fresh blueberries", price: 380, img: blueberryImg },
              { category: "Tiramisu", name: "Classic Tiramisu", desc: "Italian espresso-soaked layers of mascarpone cream", price: 350, img: null },
              { category: "Tres Leches", name: "Milk Cake", desc: "Airy sponge soaked in three silky milks", price: 320, img: null },
              { category: "Signature", name: "Churros & Dip", desc: "Golden crispy churros with rich dark chocolate", price: 350, img: churrosImg },
              { category: "Signature", name: "Dessert Boxes", desc: "Curated assortments, perfect for gifting", price: 480, img: null },
              { category: "Signature", name: "Seasonal Specials", desc: "Limited edition creations, crafted for the moment", price: 299, img: null }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }
                }}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-card-border"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-primary/10 relative">
                  {item.img ? (
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-foreground/10 flex items-center justify-center p-8 text-center">
                      <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center">
                         <span className="font-serif text-primary/50 text-2xl">V</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-foreground uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-serif text-2xl font-bold text-card-foreground leading-tight">{item.name}</h3>
                    <span className="font-serif text-xl font-medium text-primary">₹{item.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-8 line-clamp-2 h-12">{item.desc}</p>
                  <button className="w-full py-3 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300 tracking-wide uppercase text-sm">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {[
              { icon: Coffee, title: "Premium Ingredients", desc: "Sourced from the finest local and international purveyors." },
              { icon: ChefHat, title: "Freshly Handmade", desc: "Baked to order ensuring peak freshness and flavor." },
              { icon: Sparkles, title: "Elegant Presentation", desc: "Luxurious packaging that feels like a precious gift." },
              { icon: Heart, title: "Made With Passion", desc: "Uncompromising dedication to the craft of dessert making." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full bg-background/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                  <feature.icon size={32} className="text-primary group-hover:text-primary-foreground transition-colors duration-500" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-background/70 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 md:py-32 bg-background relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Sweet Words</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-muted-foreground">Don't just take our word for it. Here's what our beloved customers have to say about the VELVORA experience.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Best brownies I've ever had! The chocolate flavor is absolutely divine.", author: "Priya S." },
              { text: "Beautiful presentation and amazing taste. Every celebration feels special.", author: "Aarav M." },
              { text: "Perfect for celebrations. The Biscoff cheesecake was absolutely dreamy.", author: "Neha R." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.1 } }
                }}
                className="bg-card p-8 rounded-2xl shadow-sm border border-card-border"
              >
                <div className="flex gap-1 text-primary mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                </div>
                <p className="text-muted-foreground italic mb-6 leading-relaxed">"{review.text}"</p>
                <p className="font-serif font-bold text-foreground">— {review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram & CTA Section Combined */}
      <section id="contact" className="py-24 md:py-32 bg-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Let's Sweeten Your Day</h2>
              <div className="w-16 h-1 bg-primary mb-8 rounded-full"></div>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Ready to indulge? Place your order directly via WhatsApp or follow our journey on Instagram for our latest seasonal creations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/918951586767" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#128C7E] transition-all shadow-md"
                >
                  <FaWhatsapp size={22} />
                  WhatsApp Order
                </a>
                <a 
                  href="https://instagram.com/velvora.desserts" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-8 py-4 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity shadow-md"
                >
                  <FaInstagram size={22} />
                  Follow Instagram
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-4 mt-8">
                <img src={brownieImg} alt="Instagram feed 1" className="rounded-2xl shadow-md object-cover aspect-square" />
                <img src={biscoffImg} alt="Instagram feed 2" className="rounded-2xl shadow-md object-cover aspect-[4/5]" />
              </div>
              <div className="flex flex-col gap-4">
                <img src={churrosImg} alt="Instagram feed 3" className="rounded-2xl shadow-md object-cover aspect-[4/5]" />
                <img src={blueberryImg} alt="Instagram feed 4" className="rounded-2xl shadow-md object-cover aspect-square" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/80 py-16 border-t border-background/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="font-serif font-bold text-2xl tracking-wider text-background">VELVORA</span>
              </div>
              <p className="font-serif italic text-primary">Crafting Sweet Memories.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium tracking-wide">
              <button onClick={() => scrollTo("hero")} className="hover:text-primary transition-colors">Home</button>
              <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollTo("menu")} className="hover:text-primary transition-colors">Menu</button>
              <button onClick={() => scrollTo("reviews")} className="hover:text-primary transition-colors">Reviews</button>
              <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button>
            </div>

            <div className="flex justify-center md:justify-end gap-6">
              <a href="https://wa.me/918951586767" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors">
                <FaWhatsapp size={24} />
              </a>
              <a href="https://instagram.com/velvora.desserts" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-background/10 text-center text-xs text-background/50">
            <p>&copy; {new Date().getFullYear()} VELVORA Desserts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

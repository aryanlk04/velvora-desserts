import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star, Heart, ChefHat, Sparkles, Coffee, Instagram, Gift, Flame } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

// Assets
import velvoraLogo from "@assets/velvora_1781462306011.PNG";
import biscoffImg from "@assets/biscoff_1781446961031.jpg";
import blueberryImg from "@assets/bluberry_1781446961032.jpg";
import brownieImg from "@assets/brownie_1781446961032.jpg";
import churrosImg from "@assets/churros_1781446961032.jpg";
import mangoImg from "@assets/mango_1781446961032.jpg";
import treslechesImg from "@assets/tresleches_1781448501026.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
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

const WHATSAPP_URL = "https://wa.me/918951586767";

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  img: string | null;
  bestSeller?: boolean;
};

type ComboItem = {
  name: string;
  contents: string[];
  price: string;
  images: (string | null)[];
  bestSeller?: boolean;
};

function ComboImageCollage({ images }: { images: (string | null)[] }) {
  const valid = images.filter(Boolean) as string[];
  if (valid.length === 0) {
    return <div className="w-full h-full bg-gradient-to-br from-primary/20 to-foreground/10 flex items-center justify-center"><span className="font-serif text-primary/40 text-4xl">V</span></div>;
  }
  if (valid.length === 1) {
    return <img src={valid[0]} alt="combo" className="w-full h-full object-cover" />;
  }
  if (valid.length === 2) {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-0.5">
        {valid.map((img, i) => <img key={i} src={img} alt={`combo-${i}`} className="w-full h-full object-cover" />)}
      </div>
    );
  }
  if (valid.length === 3) {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-0.5">
        <img src={valid[0]} alt="combo-0" className="w-full h-full object-cover row-span-2" style={{ gridRow: "span 2" }} />
        <img src={valid[1]} alt="combo-1" className="w-full h-full object-cover" />
        <img src={valid[2]} alt="combo-2" className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
      {valid.slice(0, 4).map((img, i) => <img key={i} src={img} alt={`combo-${i}`} className="w-full h-full object-cover" />)}
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState("cheesecakes");
  const tabScrollRef = useRef<HTMLDivElement>(null);

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
          <button onClick={() => scrollTo("hero")} className="relative z-10 flex items-center gap-3 group">
            <img
              src={velvoraLogo}
              alt="VELVORA Logo"
              className="flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                height: "clamp(45px, 5vw, 68px)",
                width: "auto",
                objectFit: "cover",
                display: "block",
                borderRadius: "50%",
              }}
            />
            <span className="font-serif font-bold text-lg md:text-xl tracking-wider text-foreground">VELVORA</span>
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
              Premium brownies, cheesecakes, churros, tres leches and hot chocolate crafted fresh for every order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("menu")}
                className="bg-[#C8965A] text-[#2d180b] px-8 py-4 rounded-full font-medium tracking-wide hover:bg-white transition-all duration-300 shadow-lg text-center"
              >
                View Menu
              </button>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi VELVORA! I'd like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-[#C8965A] text-[#C8965A] px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#C8965A] hover:text-[#2d180b] transition-all duration-300 text-center"
              >
                <FaWhatsapp size={20} />
                Order on WhatsApp
              </a>
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
                  <path id="curve" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                  <text fontSize="7.2" letterSpacing="3" className="font-serif uppercase fill-current">
                    <textPath href="#curve">HANDCRAFTED WITH LOVE ✦ </textPath>
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

      {/* Menu Section */}
      <section id="menu" className="py-24 md:py-32 bg-[#FAF6F0] border-y border-border/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">Our Official Menu</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">The VELVORA Collection</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-muted-foreground text-lg">Every item freshly crafted for your order. Select a category to explore.</p>
          </motion.div>

          {/* Tab Navigation */}
          <div ref={tabScrollRef} className="flex gap-2 overflow-x-auto pb-3 mb-12 snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
            {([
              { id: "cheesecakes", label: "Cheesecakes" },
              { id: "brownies", label: "Brownies" },
              { id: "churros", label: "Churros" },
              { id: "tresleches", label: "Tres Leches" },
              { id: "hotchocolate", label: "Hot Chocolate" },
              { id: "fullcakes", label: "Full Cheesecakes" },
              { id: "combos", label: "Combos" },
            ] as { id: string; label: string }[]).map((tab) => (
              <button
                key={tab.id}
                data-testid={`tab-${tab.id}`}
                onClick={() => setActiveMenuTab(tab.id)}
                className={`snap-start flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                  activeMenuTab === tab.id
                    ? "bg-foreground text-background border-foreground shadow-md"
                    : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeMenuTab !== "combos" && (() => {
              const menuData: Record<string, { whatsappMsg: string; items: MenuItem[] }> = {
                cheesecakes: {
                  whatsappMsg: "Hi VELVORA! I'd like to order a Cheesecake.",
                  items: [
                    { name: "Biscoff Cheesecake", desc: "Spiced Lotus Biscoff crust layered with silky caramel cream cheese filling", price: "₹119", img: biscoffImg, bestSeller: true },
                    { name: "Blueberry Cheesecake", desc: "Velvety cream cheese crowned with a luscious fresh blueberry compote", price: "₹169", img: blueberryImg },
                    { name: "Mango Cheesecake", desc: "Tropical mango mousse over a buttery biscuit base — summer in every bite", price: "₹129", img: mangoImg },
                    { name: "Strawberry Cheesecake", desc: "Classic cream cheese filling with a fresh strawberry glaze on top", price: "₹129", img: null },
                  ],
                },
                brownies: {
                  whatsappMsg: "Hi VELVORA! I'd like to order Brownies.",
                  items: [
                    { name: "Classic Brownie", desc: "Deep, fudgy chocolate brownie with a crinkle-top crust — pure indulgence", price: "₹69", img: brownieImg, bestSeller: true },
                    { name: "Walnut Brownie", desc: "Rich chocolate brownie studded with crunchy whole walnuts throughout", price: "₹99", img: brownieImg },
                    { name: "Almond Brownie", desc: "Dense fudge brownie topped with toasted almonds and a hint of sea salt", price: "₹109", img: brownieImg },
                    { name: "Mini Brownie (8 pcs) + Dip", desc: "Eight bite-sized fudge brownies served with a warm chocolate dipping sauce", price: "₹149", img: brownieImg },
                  ],
                },
                churros: {
                  whatsappMsg: "Hi VELVORA! I'd like to order Churros.",
                  items: [
                    { name: "Classic Churros", desc: "Golden crispy churros dusted with cinnamon sugar and rich dark chocolate dip", price: "₹109", img: churrosImg, bestSeller: true },
                    { name: "Lotus Biscoff Churros", desc: "Crispy churros drizzled with warm Biscoff spread and crushed cookie crumble", price: "₹119", img: churrosImg },
                  ],
                },
                tresleches: {
                  whatsappMsg: "Hi VELVORA! I'd like to order Tres Leches.",
                  items: [
                    { name: "Classic Tres Leches", desc: "Airy sponge cake soaked in three silky milks, chilled and finished with whipped cream", price: "₹199", img: treslechesImg, bestSeller: true },
                  ],
                },
                hotchocolate: {
                  whatsappMsg: "Hi VELVORA! I'd like to order a Hot Chocolate.",
                  items: [
                    { name: "Classic Hot Chocolate", desc: "Velvety warm dark chocolate blended into steamed milk — rich and comforting", price: "₹109", img: null },
                    { name: "Marshmallow Hot Chocolate", desc: "Our signature hot chocolate crowned with toasted mini marshmallows", price: "₹139", img: null },
                  ],
                },
                fullcakes: {
                  whatsappMsg: "Hi VELVORA! I'd like to order a Full Cheesecake.",
                  items: [
                    { name: "Biscoff Cheesecake (Full)", desc: "A full Lotus Biscoff cheesecake — perfect for celebrations and gifting", price: "₹899", img: biscoffImg, bestSeller: true },
                    { name: "Blueberry Cheesecake (Full)", desc: "A generous whole blueberry cheesecake, beautifully presented", price: "₹1199", img: blueberryImg },
                    { name: "Mango Cheesecake (Full)", desc: "Full tropical mango cheesecake — ideal for parties and events", price: "₹949", img: mangoImg },
                    { name: "Strawberry Cheesecake (Full)", desc: "Elegant full strawberry cheesecake with glossy berry topping", price: "₹999", img: null },
                  ],
                },
              };
              const current = menuData[activeMenuTab];
              if (!current) return null;
              return (
                <motion.div
                  key={activeMenuTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                    {current.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        data-testid={`card-menu-${activeMenuTab}-${i}`}
                        className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-card-border flex flex-col"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden bg-primary/10 relative flex-shrink-0">
                          {item.img ? (
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#C8965A]/20 via-[#8B4513]/10 to-[#3B1F0E]/10 flex items-center justify-center">
                              <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                                <span className="font-serif text-primary/60 text-3xl font-bold">V</span>
                              </div>
                            </div>
                          )}
                          {item.bestSeller && (
                            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Flame size={11} />
                              Best Seller
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <h3 className="font-serif text-lg font-bold text-card-foreground leading-tight">{item.name}</h3>
                            <span className="font-serif text-lg font-bold text-primary flex-shrink-0">{item.price}</span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">{item.desc}</p>
                          <a
                            href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi VELVORA! I'd like to order: ${item.name} (${item.price})`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`btn-order-${activeMenuTab}-${i}`}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#128C7E] transition-colors duration-300 tracking-wide text-sm"
                          >
                            <FaWhatsapp size={16} />
                            Order via WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={`${WHATSAPP_URL}?text=${encodeURIComponent(current.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#128C7E] transition-all shadow-md text-base"
                    >
                      <FaWhatsapp size={22} />
                      Order All {activeMenuTab === "cheesecakes" ? "Cheesecakes" : activeMenuTab === "brownies" ? "Brownies" : activeMenuTab === "churros" ? "Churros" : activeMenuTab === "tresleches" ? "Tres Leches" : activeMenuTab === "hotchocolate" ? "Hot Chocolates" : "Full Cheesecakes"} via WhatsApp
                    </a>
                  </div>
                </motion.div>
              );
            })()}

            {activeMenuTab === "combos" && (() => {
              const combos: ComboItem[] = [
                {
                  name: "Combo 1",
                  contents: ["Any 1 Cheesecake (Biscoff / Blueberry)", "Classic Churros"],
                  price: "₹199 / ₹229",
                  images: [biscoffImg, churrosImg],
                },
                {
                  name: "Combo 2",
                  contents: ["Classic Churros", "Classic Brownie", "Classic Hot Chocolate"],
                  price: "₹269",
                  images: [churrosImg, brownieImg, null],
                },
                {
                  name: "Combo 3",
                  contents: ["Any 1 Cheesecake (Biscoff / Blueberry)", "Classic Brownie", "Tres Leches"],
                  price: "₹369 / ₹399",
                  images: [biscoffImg, brownieImg, treslechesImg],
                  bestSeller: true,
                },
              ];
              return (
                <motion.div
                  key="combos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
                    {combos.map((combo, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        data-testid={`card-combo-${i}`}
                        className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-card-border flex flex-col"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden relative flex-shrink-0">
                          <ComboImageCollage images={combo.images} />
                          {combo.bestSeller && (
                            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 z-10">
                              <Star size={11} fill="currentColor" />
                              Most Popular
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f07]/60 via-transparent to-transparent pointer-events-none"></div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="font-serif text-white text-xl font-bold drop-shadow">{combo.name}</span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <ul className="space-y-1.5 mb-4 flex-1">
                            {combo.contents.map((c, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary mt-0.5 flex-shrink-0">✦</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-serif text-xl font-bold text-primary">{combo.price}</span>
                            <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">Save More</span>
                          </div>
                          <a
                            href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi VELVORA! I'd like to order ${combo.name}: ${combo.contents.join(", ")} (${combo.price})`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`btn-order-combo-${i}`}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#128C7E] transition-colors duration-300 tracking-wide text-sm"
                          >
                            <FaWhatsapp size={16} />
                            Order via WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi VELVORA! I'd like to know more about your combos.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#128C7E] transition-all shadow-md text-base"
                    >
                      <FaWhatsapp size={22} />
                      Order a Combo via WhatsApp
                    </a>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
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

import React, { useState, useEffect } from 'react';

// Données des destinations avec ton storytelling enrichi
const destinations = [
  {
    id: 'paris',
    title: 'Paris 1889',
    period: 'La Belle Époque',
    price: '25 000 €',
    description: 'Flânez sur le Champ-de-Mars sous la structure monumentale en fer puddlé de la toute nouvelle Tour Eiffel. Entre l’effervescence industrielle de l’Exposition Universelle, les spectacles du Moulin Rouge et les ateliers d’artistes de Montmartre, vivez l’apogée de l’élégance et de l’optimisme français.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' // Remplaçable par ton lien de projet 1
  },
  {
    id: 'cretace',
    title: 'Le Crétacé',
    period: '-65 Millions d’années',
    price: '45 000 €',
    description: 'Déconnectez totalement de l’ère humaine. Explorez des plaines vierges et des forêts de fougères géantes sous un ciel sans pollution. À bord de nos capsules blindées invisibles, observez la majesté brute des troupeaux de Tricératops et le frisson du prédateur ultime, le Tyrannosaure.',
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'florence',
    title: 'Florence 1504',
    period: 'La Renaissance',
    price: '35 000 €',
    description: 'Plongez au cœur du berceau du génie humain. Marchez dans les ruelles pavées de la Toscane de la Renaissance, respirez l’odeur des huiles et des pigments dans les ateliers, et contemplez la naissance d’œuvres éternelles comme le David de Michel-Ange ou les carnets de Léonard de Vinci.',
    image: 'https://images.unsplash.com/photo-1543013309-0d1f4edeb868?auto=format&fit=crop&w=800&q=80'
  }
];

export default function App() {
  // États pour le formulaire de réservation
  const [formData, setFormData] = useState({ destination: 'paris', travelers: 1, dateDep: '', dateRet: '' });
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success
  const [ticketNumber, setTicketNumber] = useState('');
  const [bookingError, setBookingError] = useState('');

  // États pour le Chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour. Je suis l’assistant virtuel de TimeTravel Agency. Quelle époque puis-je vous aider à explorer aujourd’hui ?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Gestion de la réservation
  const handleBooking = (e) => {
    e.preventDefault();
    if (formData.travelers > 4) {
      setBookingError('Alerte : Capacité maximale de 4 voyageurs pour maintenir la stabilité temporelle.');
      return;
    }
    setBookingError('');
    setBookingStatus('loading');
    
    // Simulation du saut temporel (2 secondes)
    setTimeout(() => {
      setTicketNumber(`TT-${Math.floor(100000 + Math.random() * 900000)}X`);
      setBookingStatus('success');
    }, 2000);
  };

  // Gestion des réponses du Chatbot
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation de l'intelligence du Concierge de Luxe
    setTimeout(() => {
      let botReply = "Je comprends parfaitement votre intérêt. Nos guides experts sont à votre disposition pour sécuriser votre saut temporel.";
      const lowerText = userText.toLowerCase();

      if (lowerText.includes('art') || lowerText.includes('florence') || lowerText.includes('peinture')) {
        botReply = "Pour les amateurs d'art, Florence en 1504 est une évidence. Vous y croiserez Michel-Ange en plein travail. Le séjour est proposé à partir de 35 000 €.";
      } else if (lowerText.includes('dinosaure') || lowerText.includes('crétacé') || lowerText.includes('nature')) {
        botReply = "Le Crétacé est notre destination la plus sauvage. Un safari d'observation brut à 45 000 € pour observer les derniers géants de la Terre.";
      } else if (lowerText.includes('paris') || lowerText.includes('tour eiffel') || lowerText.includes('prix paris')) {
        botReply = "Paris 1889 vous ouvrira les portes de l'Exposition Universelle et de la Tour Eiffel flambant neuve pour 25 000 €.";
      } else if (lowerText.includes('prix') || lowerText.includes('cher') || lowerText.includes('combien')) {
        botReply = "Nos tarifs d'exception débutent à 25 000 € pour Paris, 35 000 € pour Florence et 45 000 € pour l'expérience ultime au Crétacé.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-serif tracking-widest text-[#D4AF37] font-bold">TIMETRAVEL AGNCY</div>
        <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-medium text-gray-400">
          <a href="#" className="hover:text-[#D4AF37] transition">Accueil</a>
          <a href="#destinations" className="hover:text-[#D4AF37] transition">Destinations</a>
          <a href="#booking" className="hover:text-[#D4AF37] transition">Réservation</a>
        </nav>
        <a href="#booking" className="px-5 py-2 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-wider rounded-none hover:bg-[#D4AF37] hover:text-black transition duration-300">
          Privatiser un saut
        </a>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-[#111] via-[#0A0A0A] to-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <h1 className="text-4xl md:text-6xl font-serif text-white max-w-4xl leading-tight mb-6">
          Le luxe n’a plus de limites.<br /><span className="text-[#D4AF37]">Le temps non plus.</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-base md:text-lg mb-8 font-light leading-relaxed">
          Explorez les époques les plus fascinantes de l'histoire humaine à bord de nos capsules privées. Sécurité temporelle absolue, immersion totale et guides natifs.
        </p>
        <a href="#destinations" className="px-8 py-4 bg-[#D4AF37] text-black uppercase tracking-widest text-xs font-bold hover:bg-white hover:scale-105 transition duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          Explorer les Époques
        </a>
      </section>

      {/* 3. GALERIE DES DESTINATIONS */}
      <section id="destinations" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2 font-semibold">Catalogue Officiel</h2>
          <p className="text-3xl font-serif text-white">Nos Fenêtres Temporelles Exclusives</p>
        </div>

        <div className="space-y-24">
          {destinations.map((dest, index) => (
            <div key={dest.id} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 overflow-hidden group border border-white/10">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-[350px] object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                  loading="lazy"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">{dest.period}</span>
                <h3 className="text-3xl font-serif text-white">{dest.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{dest.description}</p>
                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <span className="text-sm font-mono text-gray-500">Tarif membre</span>
                  <span className="text-xl text-[#D4AF37] font-serif">{dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FORMULAIRE DE RÉSERVATION */}
      <section id="booking" className="py-24 bg-[#111111] border-t border-white/5 px-6">
        <div className="max-w-xl mx-auto bg-[#0A0A0A] p-8 border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
          <h3 className="text-2xl font-serif text-white text-center mb-6">Time Booker — Planifier l'embarquement</h3>
          
          {bookingStatus === 'idle' && (
            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Destination</label>
                <select 
                  className="w-full bg-[#111] border border-white/10 p-3 text-white rounded-none focus:border-[#D4AF37] outline-none"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                >
                  <option value="paris">Paris 1889 — La Belle Époque</option>
                  <option value="cretace">Le Crétacé — Époque Préhistorique</option>
                  <option value="florence">Florence 1504 — La Renaissance</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Départ Ancrage</label>
                  <input type="date" required className="w-full bg-[#111] border border-white/10 p-3 text-white rounded-none focus:border-[#D4AF37] outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Retour Continuum</label>
                  <input type="date" required className="w-full bg-[#111] border border-white/10 p-3 text-white rounded-none focus:border-[#D4AF37] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Explorateurs (Max 4)</label>
                <input 
                  type="number" 
                  min="1" 
                  className="w-full bg-[#111] border border-white/10 p-3 text-white rounded-none focus:border-[#D4AF37] outline-none"
                  value={formData.travelers}
                  onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value) || 1})}
                />
                {bookingError && <p className="text-red-400 text-xs mt-2 font-mono">{bookingError}</p>}
              </div>

              <button type="submit" className="w-full py-4 bg-[#D4AF37] text-black uppercase tracking-widest text-xs font-bold hover:bg-white transition duration-300">
                Valider l'embarquement
              </button>
            </form>
          )}

          {bookingStatus === 'loading' && (
            <div className="py-12 text-center space-y-4">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full" />
              <p className="text-sm font-mono tracking-widest text-[#D4AF37]">CALCUL DES COORDONNÉES ET VORTEX TEMPOREL EN COURS...</p>
            </div>
          )}

          {bookingStatus === 'success' && (
            <div className="py-8 text-center space-y-6 border border-dashed border-[#D4AF37]/50 p-6 bg-[#111]/50 animate-fade-in">
              <div className="text-[#D4AF37] text-4xl">✓</div>
              <h4 className="text-xl font-serif text-white">Saut Temporel Confirmé</h4>
              <p className="text-xs text-gray-400 font-mono">Votre pass d'embarquement quantique a été généré avec succès.</p>
              <div className="bg-black p-4 inline-block border border-white/10 font-mono text-md tracking-wider text-white">
                PASS ID : <span className="text-[#D4AF37]">{ticketNumber}</span>
              </div>
              <button onClick={() => setBookingStatus('idle')} className="block mx-auto text-xs text-[#D4AF37] underline hover:text-white">
                Nouvelle planification
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. FLOATING CHATBOT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-[#D4AF37] text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition relative group animate-pulse"
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></span>
            💬
          </button>
        ) : (
          <div className="w-80 md:w-96 h-[450px] bg-[#0A0A0A] border border-[#D4AF37] shadow-2xl flex flex-col animate-slide-up">
            <div className="bg-[#111] p-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-serif text-white font-bold">Concierge Temporel AI</h4>
                <p className="text-[10px] text-[#D4AF37] font-mono tracking-wider uppercase">Disponible 24/7</p>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs scrollbar-thin">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3 ${msg.sender === 'user' ? 'bg-[#D4AF37] text-black font-medium' : 'bg-[#161616] text-gray-300 border border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-left">
                  <span className="inline-block bg-[#161616] text-gray-500 px-3 py-2 font-mono text-[10px]">Le Concierge analyse votre demande...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2 bg-[#111]">
              <input 
                type="text" 
                placeholder="Posez vos questions sur les voyages..." 
                className="flex-1 bg-black border border-white/10 p-2 text-white outline-none focus:border-[#D4AF37] text-xs"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button type="submit" className="bg-[#D4AF37] text-black px-4 text-xs font-bold hover:bg-white transition">Envoyer</button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}

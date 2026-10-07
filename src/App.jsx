import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Mail, 
  Send, 
  Sparkles, 
  Music, 
  Play, 
  Pause, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  PartyPopper
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [isShot, setIsShot] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto', position: 'static' });
  const [yesScale, setYesScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const namaGebetan = "Elsa Puspitasari";
  const musicUrl = "bucin.mp3"; 
  const photoUrl = "bucin.jpeg"; 

  const handleShoot = () => {
    if (isShot) return;
    setIsShot(true);
    setTimeout(() => {
      setStep(2);
    }, 1200);
  };

  const moveNoButton = () => {
    const padding = 100;
    const x = Math.random() * (window.innerWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - padding * 2) + padding;
    
    setNoButtonPos({
      top: `${y}px`,
      left: `${x}px`,
      position: 'fixed',
      zIndex: 50
    });

    setYesScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleYes = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff007f', '#ff69b4', '#ff1493', '#ffffff']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff007f', '#ff69b4', '#ff1493', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    setStep(4);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-pink-300 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none font-['Fredoka',sans-serif]">
      
      {/* Background SVG Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Heart className="absolute top-10 left-10 text-pink-500 animate-bounce" size={44} />
        <Sparkles className="absolute bottom-20 left-1/4 text-pink-600 animate-pulse" size={36} />
        <Heart className="absolute top-1/3 right-12 text-rose-500 animate-bounce" size={52} />
        <PartyPopper className="absolute bottom-10 right-10 text-rose-400 animate-pulse" size={40} />
      </div>

      {/* Music Player Button */}
      <audio ref={audioRef} src={musicUrl} loop />
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-xl border border-pink-200 text-pink-600 flex items-center gap-2 hover:bg-white active:scale-95 transition"
      >
        <Music className={isPlaying ? "animate-spin text-pink-500" : ""} size={20} />
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: MINI GAME PANAH & AMPLOP */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 w-full max-w-sm text-center relative z-10 flex flex-col items-center"
          >
            <h1 className="text-2xl font-bold text-pink-600 mb-2 flex items-center gap-2">
              <Sparkles size={24} /> Misi Khusus Untuk {namaGebetan}
            </h1>
            <p className="text-gray-600 text-sm mb-8">
              Tembak panah ini untuk membuka pesan!
            </p>

            <div className="relative my-8 flex items-center justify-center w-full h-32">
              <motion.div
                animate={isShot ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : { y: [0, -8, 0] }}
                transition={{ repeat: isShot ? 0 : Infinity, duration: 2 }}
                className="bg-rose-500 p-6 rounded-2xl shadow-xl text-white relative"
              >
                <Mail size={56} />
                <Heart size={20} className="absolute top-2 right-2 fill-white text-white" />
              </motion.div>

              <motion.div
                initial={{ x: -140, opacity: 1 }}
                animate={isShot ? { x: 0, scale: 1.2 } : { x: -140 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute text-pink-600 drop-shadow-md"
              >
                <Send size={40} className="rotate-45 fill-pink-500" />
              </motion.div>
            </div>

            <button
              onClick={handleShoot}
              disabled={isShot}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-pink-300/50 active:scale-95 transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              <Send size={20} /> {isShot ? "Panah Meluncur..." : "Tembak Amplop!"}
            </button>
          </motion.div>
        )}

        {/* STEP 2: SURAT CINTA */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 w-full max-w-sm text-center relative z-10"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500 shadow-inner">
              <Heart className="fill-pink-500" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Surat Buat Kamu
            </h2>

            <div className="bg-pink-50/80 p-5 rounded-2xl border border-pink-100 text-left text-gray-700 text-base leading-relaxed mb-6 space-y-3">
              <p>
                Halo <b>{namaGebetan}</b>,
              </p>
              <p>
                Aku sebenarnya sudah cukup lama ingin menyampaikan ini, tapi baru sekarang aku berani mengatakannya.
                Aku suka cinta dan sayang sama kamu. Bukan cuma karena kamu adalah seseorang yang bikin aku nyaman, tapi karena aku melihat ada sesuatu yang berbeda dari cara kita memandang hidup. Aku suka bagaimana kita sama-sama punya keinginan untuk terus belajar, berkembang, dan menjadi versi terbaik dari diri kita masing-masing.
                Aku nggak berharap kita harus langsung menjadi sesuatu yang sempurna. Aku cuma ingin kalau memang kamu juga merasakan hal yang sama, kita bisa mencoba berjalan bersama. Saling mendukung, saling mengingatkan, dan sama-sama bertumbuh tanpa harus kehilangan diri kita masing-masing.
                Menurutku, punya tujuan yang searah jauh lebih berarti daripada sekadar punya perasaan yang sama. Dan entah kenapa, aku merasa kamu adalah seseorang yang ingin aku ajak untuk menuju ke sana, dan aku ingin tahu apakah mungkin kita bisa memulai sesuatu yang lebih dari ini, bersama-sama.
              </p>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold rounded-2xl shadow-lg shadow-pink-300/50 active:scale-95 transition flex items-center justify-center gap-2"
            >
              Lanjut Baca <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {/* STEP 3: PENEMBAKAN */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 w-full max-w-sm text-center relative z-10"
          >
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
              <Sparkles size={36} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-snug">
              Mau gak kamu jadi pacar aku?
            </h2>

            <div className="flex flex-col gap-4 items-center justify-center min-h-[140px] relative">
              <button
                onClick={handleYes}
                style={{ transform: `scale(${yesScale})` }}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold rounded-2xl shadow-xl shadow-pink-400/50 active:scale-95 transition-all duration-200 z-20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={22} /> MAU BANGEETT!!!
              </button>

              <button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                style={noButtonPos}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold rounded-xl text-base transition-all duration-150 flex items-center gap-1"
              >
                <XCircle size={18} /> Enggak dulu!!
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: SELEBRASI CONGRATS & FOTO KOTAK */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 w-full max-w-sm text-center relative z-10 flex flex-col items-center"
          >
            {/* Foto Kotak Gaya Polaroid */}
            <div className="relative mb-6 p-3 bg-white shadow-xl rounded-2xl border border-pink-100 rotate-1 hover:rotate-0 transition-transform">
              <img
                src={photoUrl}
                alt="Our Moment"
                className="w-48 h-48 object-cover rounded-xl"
              />
              <div className="absolute -bottom-3 -right-3 bg-pink-500 text-white p-2.5 rounded-2xl shadow-lg">
                <Heart size={20} className="fill-white" />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-pink-600 mb-1 flex items-center gap-2">
              CONGRATS! <PartyPopper size={28} />
            </h2>
            <p className="text-sm text-pink-500 font-bold tracking-wider uppercase mb-4">
              Official Relationship Unlocked
            </p>

            <p className="text-gray-600 text-base leading-relaxed">
              Makasih ya udah mau nerima aku! 🥰✨
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
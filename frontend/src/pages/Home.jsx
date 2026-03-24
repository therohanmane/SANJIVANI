import { Link } from 'react-router-dom';
import { BookOpen, Wrench, MonitorSmartphone, GraduationCap, ArrowRight, Sparkles, Zap, Code2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen font-sans transition-colors duration-300 selection:bg-violet-500/30 dark:selection:bg-cyan-500/30">
      
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px] mix-blend-screen mix-blend-screen"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[100px] mix-blend-screen"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-fuchsia-600/10 blur-[150px] mix-blend-screen"></div>
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 w-full flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-bold tracking-wider uppercase mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Level Up Your Skills — 2026</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[1.1]">
              HACK YOUR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
                DIGITAL FUTURE
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
              Sanjivani Computer is your ultimate hub for next-gen IT courses, fast tech repairs, and premium gaming/PC accessories. Join the elite.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
              <Link to="/courses" className="relative group px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl w-full sm:w-auto overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <Code2 className="w-5 h-5" /> Explore Courses
                </span>
              </Link>
              <Link to="/services" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-violet-500/50 text-slate-900 dark:text-white font-bold rounded-2xl w-full sm:w-auto transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group shadow-sm dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]">
                <Wrench className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" /> Book Repair
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            {/* Super cool floating tech visual */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 rounded-[3rem] rotate-6 blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[3rem] -rotate-3 p-8 flex flex-col hover:rotate-0 transition-transform duration-500 shadow-2xl">

                 <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-slate-400 border border-white/5">script.js</div>
                 </div>
                 <div className="font-mono text-sm sm:text-base text-slate-700 dark:text-slate-300 space-y-4 flex-1">
                    <p><span className="text-violet-600 dark:text-violet-400">const</span> student = <span className="text-cyan-600 dark:text-cyan-400">await</span> SanjivaniComputer.enroll();</p>
                    <p>student.skills.push(<span className="text-green-400">'Web Dev'</span>, <span className="text-green-400">'AI'</span>);</p>
                    <p><span className="text-fuchsia-400">if</span> (student.isReady) {'{'}</p>
                    <p className="pl-4">console.<span className="text-blue-400">log</span>(<span className="text-yellow-300">'Unstoppable 🚀'</span>);</p>
                    <p>{'}'}</p>
                 </div>
                 <div className="mt-auto h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 w-2/3 shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Highlights / Features */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Arsenal</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Master the matrix, fix your gear, and equip the best loot.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Feature 1 */}
            <div className="p-1 group relative rounded-[2rem] bg-gradient-to-b from-slate-800 to-slate-900 hover:from-violet-500/50 hover:to-cyan-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] blur-xl transition-opacity duration-500"></div>
              <div className="h-full p-8 rounded-[1.8rem] bg-slate-900/90 backdrop-blur-xl border border-white/5 flex flex-col relative z-10">
                <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Pro Training</h3>
                <p className="text-slate-400 mb-8 flex-1">From zero to hero. Learn Full Stack Web Dev, Python, MS-CIT and more with hands-on real world projects.</p>
                <Link to="/courses" className="inline-flex items-center text-violet-400 font-bold hover:text-violet-300 group/link">View Courses <ArrowRight className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" /></Link>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="p-1 group relative rounded-[2rem] bg-gradient-to-b from-slate-800 to-slate-900 hover:from-cyan-500/50 hover:to-blue-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] blur-xl transition-opacity duration-500"></div>
              <div className="h-full p-8 rounded-[1.8rem] bg-slate-900/90 backdrop-blur-xl border border-white/5 flex flex-col relative z-10">
                <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Instant Repairs</h3>
                <p className="text-slate-400 mb-8 flex-1">Laptop dead? PC lagging? We offer lightning-fast diagnostics and repair services to get you back in the game.</p>
                <Link to="/services" className="inline-flex items-center text-cyan-400 font-bold hover:text-cyan-300 group/link">Book Service <ArrowRight className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" /></Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-1 group relative rounded-[2rem] bg-gradient-to-b from-slate-800 to-slate-900 hover:from-fuchsia-500/50 hover:to-pink-500/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] blur-xl transition-opacity duration-500"></div>
              <div className="h-full p-8 rounded-[1.8rem] bg-slate-900/90 backdrop-blur-xl border border-white/5 flex flex-col relative z-10">
                <div className="w-16 h-16 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-fuchsia-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(217,70,239,0.1)] group-hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]">
                  <MonitorSmartphone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Gear & Tech</h3>
                <p className="text-slate-400 mb-8 flex-1">Upgrade your setup. Keyboards, mice, networking gear, and sick peripherals available at unbeatable prices.</p>
                <Link to="/shop" className="inline-flex items-center text-fuchsia-400 font-bold hover:text-fuchsia-300 group/link">Enter Shop <ArrowRight className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" /></Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="p-12 md:p-20 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute top-0 right-0 p-32 bg-violet-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 p-32 bg-cyan-500/10 rounded-full blur-[80px]"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 relative z-10">Ready to break the limits?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 text-xl relative z-10">Stop waiting. Start building your future today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Link to="/contact" className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black tracking-wide uppercase rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 duration-300">
                Contact Squad
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/30 to-primary-light/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/20 to-accent-light/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary-light/15 to-transparent blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex flex-col items-center text-center min-h-[85vh] justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-white/70">Trusted by 500+ Law Firms</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            E-Filing
            <span className="block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
              Made Simple.
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-lg sm:text-xl text-white/60 mb-12 leading-relaxed">
            The modern platform for court document filing. Fast, secure, and
            designed for legal professionals who demand excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/pricing"
              className="group relative px-8 py-4 bg-accent text-white font-medium rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,164,65,0.3)]"
            >
              <span className="relative z-10">Start Filing Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/tutorials"
              className="group px-8 py-4 text-white font-medium rounded-lg border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-white/10">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">99.9%</p>
              <p className="text-sm text-white/50">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">50K+</p>
              <p className="text-sm text-white/50">Filings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">24/7</p>
              <p className="text-sm text-white/50">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}

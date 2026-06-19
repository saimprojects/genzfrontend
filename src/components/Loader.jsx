/* ─── Loader.jsx — Orange Cart Loader ─── */

if (typeof document !== 'undefined' && !document.getElementById('loader-kf')) {
  const s = document.createElement('style')
  s.id = 'loader-kf'
  s.textContent = `
    @keyframes ld-bounce {
      0%, 100% { transform: translateY(0);    opacity: 1;   }
      50%       { transform: translateY(-14px); opacity: 0.5; }
    }
    @keyframes ld-rock {
      0%, 100% { transform: rotate(0deg);   }
      25%       { transform: rotate(-6deg);  }
      75%       { transform: rotate(6deg);   }
    }
    @keyframes ld-bar {
      0%   { left: -60%; width: 50%; }
      50%  { left: 30%;  width: 60%; }
      100% { left: 110%; width: 50%; }
    }
    @keyframes ld-pulse-ring {
      0%   { transform: scale(1);    opacity: 0.6; }
      100% { transform: scale(1.55); opacity: 0;   }
    }
    .ld-d1 { animation: ld-bounce 0.75s ease-in-out 0s    infinite; }
    .ld-d2 { animation: ld-bounce 0.75s ease-in-out 0.15s infinite; }
    .ld-d3 { animation: ld-bounce 0.75s ease-in-out 0.30s infinite; }
    .ld-cart { animation: ld-rock 1.6s ease-in-out infinite; }
    .ld-bar  { animation: ld-bar  1.8s ease-in-out infinite; }
    .ld-ring { animation: ld-pulse-ring 1.4s ease-out infinite; }
  `
  document.head.appendChild(s)
}

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">

        {/* Bouncing dots — items "falling" into cart */}
        <div className="flex justify-center gap-2 mb-3 h-6 items-end">
          <span className="ld-d1 w-2.5 h-2.5 rounded-full bg-orange-300 inline-block" />
          <span className="ld-d2 w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
          <span className="ld-d3 w-2.5 h-2.5 rounded-full bg-orange-700 inline-block" />
        </div>

        {/* Cart with pulse ring */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Pulse ring behind cart */}
          <span className="ld-ring absolute inset-0 rounded-2xl bg-orange-400 block" />

          {/* Cart box */}
          <div className="ld-cart relative w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-200">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19M7 13l-1.5 6m12 0a1 1 0 11-2 0 1 1 0 012 0zM9 20a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-orange-100 rounded-full mx-auto mb-4 overflow-hidden relative">
          <span className="ld-bar absolute top-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
        </div>

        <p className="text-gray-500 text-sm font-medium tracking-wide">
          Loading amazing deals<span className="animate-pulse">...</span>
        </p>
      </div>
    </div>
  )
}

export default Loader
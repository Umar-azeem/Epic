 function DeveloperForum() {

  return <>
  <div className="text-white h-auto">
  <div className="h-full bg-[#18181B] flex items-center justify-center px-4 ">
      <div className="text-center">

        {/* 🔥 Animated Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#230DF6] via-[#6705FC] to-[#26BBFF] bg-clip-text text-transparent animate-pulse">
          Coming Soon
        </h1>

        {/* 💫 Subtitle */}
        <p className="text-gray-400 mt-4 text-sm sm:text-base md:text-lg">
          We are working on something amazing
        </p>

        {/* 🚀 Glow Circle Animation */}
        <div className="relative mt-10 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#230DF6] via-[#6705FC] to-[#26BBFF] blur-2xl opacity-50 animate-ping absolute"></div>

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#230DF6] via-[#6705FC] to-[#26BBFF] animate-bounce"></div>
        </div>

        {/* 📩 Optional Email Input */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg bg-[#27272A] text-white outline-none w-full sm:w-64"
          />

          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#230DF6] to-[#6705FC] text-white font-semibold hover:scale-105 transition">
            Notify Me
          </button> */}
        </div>

      </div>
    </div>   </div>
  </>
}

export default DeveloperForum
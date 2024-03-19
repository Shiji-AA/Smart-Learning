function BottomBanner() {
    return (
      <section className="grid grid-cols-1 gap-0 bg-gray-40 md:grid-cols-1">
        <div className="flex flex-col justify-center items-center px-4 py-24 lg:px-20">
          <h1 className="text-center mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">Become an instructor today</h1>
          <p className="text-center pr-4 mb-4 text-lg text-gray-900 tracking-relaxed lg:pr-8">Join one of the largest online learning platforms</p>
          <div>
            <button className="w-48 py-2 text-lg bg-gray-800 text-white hover:bg-gray-700">Get Started</button>
          </div>
        </div>
      </section>
    );
  }
  
  export default BottomBanner;
  
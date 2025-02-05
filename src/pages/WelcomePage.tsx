import { useEffect, useRef } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import logo from "/images/miniLogo.png";
import { ThemeToggle } from "../components/ThemeToggle";

const GlobeBackground = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globeRef.current && (window as any).Globe) {
      const globe = (window as any).Globe()(globeRef.current)
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundColor("#354F52")
        .pointOfView({ lat: 0, lng: 0, altitude: 3 });

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 2;
    }
  }, []);

  return <div ref={globeRef} className="absolute" />;
};

// Welcome Page Component
const WelcomePage = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard");
    console.log("Navigation triggered");
  };

  return (
    <div className="min-h-dvh flex flex-col relative">
      {/* Rotating Globe Background */}
      <GlobeBackground />

      {/* Semi-transparent Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div> 

      {/* Page header */}
      <header className="sticky top-0 border-b bg-white backdrop-blur-md z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="w-32 sm:w-40 h-8 sm:h-10 flex items-center">
            <img
              src={logo || "/placeholder.svg"}
              alt="Logo"
              className="transform hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Auth Button */}
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-primary-foreground shadow transition-all duration-200 hover:bg-primary/90">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-grow flex items-center justify-center text-center relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
            Track Environmental Impact
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 drop-shadow">
            Monitor pollution levels, analyze trends, and make informed decisions to reduce impact on you.
          </p>

          <div className="mt-8">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-3 text-lg bg-primary text-white rounded-md shadow-lg hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 transition">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <button
                onClick={handleDashboardClick}
                className="px-6 py-3 text-lg bg-primary text-white rounded-md shadow-lg hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 transition"
              >
                Dashboard
              </button>
            </SignedIn>
          </div>
        </div>
      </main>

      {/* Page footer */}
      <footer className="relative z-10 border-t bg-white backdrop-blur-md py-4 text-center text-gray-800">
        © {new Date().getFullYear()} Pollutio. All rights reserved.
      </footer>
    </div>
  );
};

export default WelcomePage;

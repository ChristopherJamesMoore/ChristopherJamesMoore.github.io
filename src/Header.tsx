import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import logo from "/images/miniLogo.png"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "./components/ThemeToggle"

export function Header() {
  const navigate = useNavigate()

  const homeClick = () => {
    navigate("/")
    console.log("Navigation triggered")
  }

  return (
    <header className="sticky top-0 border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur-md z-10 h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="w-32 sm:w-40 h-8 sm:h-10 flex items-center">
          <div className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
            <img
              src={logo || "/placeholder.svg"}
              alt="Logo"
              className="transform hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={homeClick}
            />
          </div>
        </div>

        {/* Theme Toggle and Auth Buttons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-primary-foreground shadow transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:text-primary-foreground">
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
  )
}


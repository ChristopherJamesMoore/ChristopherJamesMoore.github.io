export function Footer() {
  return (
    <footer className="relative z-10 border-t bg-background/70 backdrop-blur-md py-4 dark:bg-gray-900/70 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 dark:text-gray-300 dark:hover:text-white">
        © {new Date().getFullYear()} Pollutio. All rights reserved.
      </div>
    </footer>
  )
}
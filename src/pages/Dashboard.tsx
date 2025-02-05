"use client"

import { useEffect, useState, useRef } from "react"
import { map, latLng, tileLayer, type MapOptions } from "leaflet"
import "leaflet/dist/leaflet.css"
import { AirQualityGraphs } from "../components/AirAualityGraphs"
import "../styles/Dashboard.css"
import { Header } from "../Header"
import { Footer } from "../Footer"

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const options = [
    { value: "pm25", label: "PM2.5" },
    { value: "pm10", label: "PM10" },
    { value: "no2", label: "Nitrogen Dioxide" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const options: MapOptions = {
      center: latLng(50.3755, -4.1427),
      zoom: 13,
    }

    const mapContainer = document.getElementById("map")

    if (mapContainer) {
      const mymap = map("map", options)

      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(mymap)

      setTimeout(() => {
        mymap.invalidateSize()
      }, 100)

      return () => {
        mymap.remove()
      }
    }
  }, [])

  const handleSelect = (value: string, label: string) => {
    setSelectedOption(label)
    setIsOpen(false)
    console.log("Selected:", value)
  }

  return (
    <div className="dashboard-layout dark:bg-gray-900">
      <Header />
      <div className="main-content">
        <div className="map-section dark:bg-gray-800">
          <div className="map-header dark:border-gray-700">
            <div ref={dropdownRef} className="relative w-48 mx-auto">
              <button
                type="button"
                className="flex h-9 w-full items-center justify-between rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="block truncate">{selectedOption || "Select pollutant"}</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute mt-1 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50">
                  <ul className="max-h-60 overflow-auto py-1">
                    {options.map((option) => (
                      <li
                        key={option.value}
                        className={`cursor-pointer select-none px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 ${
                          selectedOption === option.label ? "bg-gray-50 dark:bg-gray-700" : ""
                        }`}
                        onClick={() => handleSelect(option.value, option.label)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="map-container">
            <div id="map" className="h-full w-full" style={{ zIndex: 0 }}></div>
          </div>
        </div>
        <div className="right-section dark:bg-gray-800 dark:text-gray-200">
          <AirQualityGraphs />
        </div>
      </div>
      <Footer />
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Skeleton } from "../components/ui/skeleton"

interface AirQualityData {
  pm25: { values: number[] }
  co2: { values: number[] }
  ozone: { values: number[] }
}

const fetchAirQualityData = async (): Promise<AirQualityData> => {
  return {
    pm25: { values: [10, 15, 20, 30, 50, 70, 120] },
    co2: { values: [400, 450, 500] },
    ozone: { values: [60, 70, 80] },
  }
}

const pollutants = [
  { key: "pm25", label: "PM2.5 (µg/m³)", color: "#82ca9d", description: "Fine particulate matter" },
  { key: "co2", label: "CO2 (ppm)", color: "#8884d8", description: "Carbon dioxide" },
  { key: "ozone", label: "Ozone (ppb)", color: "#ffc658", description: "Ground-level ozone" },
] as const

export function AirQualityGraphs() {
  const [chartData, setChartData] = useState<Record<string, { value: number }[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchAirQualityData()
        setChartData({
          pm25: data.pm25.values.map((value) => ({ value })),
          co2: data.co2.values.map((value) => ({ value })),
          ozone: data.ozone.values.map((value) => ({ value })),
        })
      } catch (err) {
        setError("Failed to fetch air quality data")
        console.error("Failed to fetch air quality data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (error) {
    return (
      <div className="p-4 text-destructive">
        {error}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col divide-y divide-border">
      {pollutants.map((pollutant) => (
        <div key={pollutant.key} className="flex-1 flex flex-col min-h-0">
          <div className="px-4 py-2 border-b border-border">
            <h3 className="font-medium text-sm">{pollutant.label}</h3>
          </div>
          <div className="flex-1 min-h-0">
            {loading ? (
              <div className="h-full p-4">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData[pollutant.key]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill={pollutant.color}
                    name={pollutant.description}
                    role="graphics-symbol"
                    aria-label={`${pollutant.label} values`}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
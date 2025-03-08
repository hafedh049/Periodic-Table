"use client"

import { motion } from "framer-motion"
import { X, AtomIcon, ThermometerIcon, LayersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ElementDetails({ element, onClose }) {
  if (!element) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl my-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-gray-900 border border-gray-700 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />
            <svg className="absolute top-0 left-0 w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Atom Animation */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-30 pointer-events-none">
            <div className="relative w-full h-full">
              {/* Nucleus */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-6 md:h-6 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]"></div>

              {/* Electron Orbits */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {/* Orbit 1 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-28 md:h-28 rounded-full border border-cyan-500/50 animate-[spin_3s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-500 rounded-full shadow-[0_0_5px_2px_rgba(6,182,212,0.5)]"></div>
                </div>

                {/* Orbit 2 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-16 md:w-44 md:h-28 rounded-full border border-purple-500/50 animate-[spin_5s_linear_infinite] rotate-45">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full shadow-[0_0_5px_2px_rgba(147,51,234,0.5)]"></div>
                </div>

                {/* Orbit 3 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-24 md:w-28 md:h-44 rounded-full border border-emerald-500/50 animate-[spin_7s_linear_infinite] rotate-90">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full shadow-[0_0_5px_2px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

          <CardHeader className="relative">
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-800">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl text-xl sm:text-3xl font-bold"
                style={{
                  backgroundColor: `#${element.cpkHex || "808080"}20`,
                  color: `#${element.cpkHex || "ffffff"}`,
                  boxShadow: `0 0 20px 2px #${element.cpkHex || "808080"}30`,
                }}
              >
                {element.symbol}
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl">{element.name}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {element.category} • Atomic Number: {element.atomicNumber}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <InfoCard
                icon={<AtomIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
                title="Atomic Mass"
                value={`${element.atomicMass?.toFixed(4)} u`}
              />
              <InfoCard
                icon={<ThermometerIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
                title="Melting Point"
                value={element.meltingPoint ? `${element.meltingPoint} K` : "Unknown"}
              />
              <InfoCard
                icon={<ThermometerIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
                title="Boiling Point"
                value={element.boilingPoint ? `${element.boilingPoint} K` : "Unknown"}
              />
              <InfoCard
                icon={<LayersIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
                title="Electron Config"
                value={element.electronicConfiguration || "Unknown"}
              />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Properties</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Density:</span>
                  <span>{element.density ? `${element.density} g/cm³` : "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Electronegativity:</span>
                  <span>{element.electronegativity || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Discovered by:</span>
                  <span>{element.discoveredBy || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year discovered:</span>
                  <span>{element.yearDiscovered || "Unknown"}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                {element.summary ||
                  `${element.name} is a chemical element with symbol ${element.symbol} and atomic number ${element.atomicNumber}.`}
              </p>
            </div>
          </CardContent>

          <CardFooter className="border-t border-gray-800 bg-gray-900/50">
            <div className="text-[10px] sm:text-xs text-gray-400">
              Period: {element.period} • Group: {element.group} • Block: {element.block}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 border border-gray-700">
      <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium truncate">{value}</div>
    </div>
  )
}


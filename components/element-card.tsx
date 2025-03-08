"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ElementCard({ element, onClick }) {
  const getCategoryColor = (category) => {
    const colors = {
      "alkali-metal": "border-pink-500 text-pink-500",
      "alkaline-earth": "border-purple-500 text-purple-500",
      "transition-metal": "border-cyan-500 text-cyan-500",
      "post-transition": "border-orange-500 text-orange-500",
      metalloid: "border-green-500 text-green-500",
      nonmetal: "border-blue-500 text-blue-500",
      halogen: "border-yellow-500 text-yellow-500",
      "noble-gas": "border-amber-500 text-amber-500",
      lanthanide: "border-lime-500 text-lime-500",
      actinide: "border-red-500 text-red-500",
      metal: "border-orange-500 text-orange-500",
      unknown: "border-gray-500 text-gray-500",
    }
    return colors[category] || colors.unknown
  }

  return (
    <motion.div
      className={cn(
        "aspect-square w-full h-full rounded-sm p-0.5 sm:p-1 cursor-pointer border-2 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/70 transition-all relative overflow-hidden",
        getCategoryColor(element.category),
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 15px 2px ${
          element.category === "alkali-metal"
            ? "rgba(236, 72, 153, 0.5)"
            : element.category === "alkaline-earth"
              ? "rgba(168, 85, 247, 0.5)"
              : element.category === "transition-metal"
                ? "rgba(6, 182, 212, 0.5)"
                : element.category === "post-transition"
                  ? "rgba(249, 115, 22, 0.5)"
                  : element.category === "metalloid"
                    ? "rgba(34, 197, 94, 0.5)"
                    : element.category === "nonmetal"
                      ? "rgba(59, 130, 246, 0.5)"
                      : element.category === "halogen"
                        ? "rgba(234, 179, 8, 0.5)"
                        : element.category === "noble-gas"
                          ? "rgba(245, 158, 11, 0.5)"
                          : element.category === "lanthanide"
                            ? "rgba(132, 204, 22, 0.5)"
                            : element.category === "actinide"
                              ? "rgba(239, 68, 68, 0.5)"
                              : "rgba(156, 163, 175, 0.5)"
        }`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      onClick={onClick}
      layout
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-20 from-transparent via-transparent to-white z-0" />

      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="text-[0.45rem] xs:text-[0.5rem] sm:text-[0.6rem] md:text-xs font-medium opacity-90 text-left">
          {element.atomicNumber}
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
          <motion.div
            className="text-xs sm:text-sm md:text-xl font-bold"
            animate={{
              textShadow: [
                "0 0 3px rgba(255,255,255,0.2)",
                "0 0 6px rgba(255,255,255,0.4)",
                "0 0 3px rgba(255,255,255,0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {element.symbol}
          </motion.div>
        </div>
        <div className="text-[0.4rem] xs:text-[0.45rem] sm:text-[0.5rem] md:text-xs opacity-90 text-center w-full mb-0.5 sm:mb-1 overflow-hidden">
          {element.name.length > 6 ? element.name.substring(0, 5) + "..." : element.name}
        </div>
      </div>
    </motion.div>
  )
}


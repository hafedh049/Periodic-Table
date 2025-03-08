"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { elementData } from "@/data/elements"
import ElementCard from "./element-card"
import ElementDetails from "./element-details"

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleElementClick = (element) => {
    setSelectedElement(element)
  }

  const closeElementDetails = () => {
    setSelectedElement(null)
  }

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null) // Toggle off if already selected
    } else {
      setSelectedCategory(category)
    }
  }

  const getElementOpacity = (element) => {
    if (!selectedCategory) return 1
    return element.category === selectedCategory ? 1 : 0.3
  }

  const categories = [
    { id: "alkali-metal", name: "Alkali Metal", color: "bg-pink-500" },
    { id: "alkaline-earth", name: "Alkaline earth metal", color: "bg-purple-500" },
    { id: "transition-metal", name: "Transition metal", color: "bg-cyan-500" },
    { id: "post-transition", name: "Basic metal", color: "bg-orange-500" },
    { id: "metalloid", name: "Semimetal", color: "bg-green-500" },
    { id: "nonmetal", name: "Nonmetal", color: "bg-blue-500" },
    { id: "halogen", name: "Halogen", color: "bg-yellow-500" },
    { id: "noble-gas", name: "Noble gas", color: "bg-amber-500" },
    { id: "lanthanide", name: "Lanthanide", color: "bg-lime-500" },
    { id: "actinide", name: "Actinide", color: "bg-red-500" },
  ]

  return (
    <div className="relative w-full max-w-[1800px] mx-auto p-2 md:p-4">
      <div className="relative overflow-x-auto pb-4 hide-scrollbar">
        <div className="min-w-[900px] md:min-w-0">
          <motion.div
            className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0.5 sm:gap-1 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {elementData.map((element, index) => (
              <motion.div
                key={element.atomicNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isLoaded ? getElementOpacity(element) : 0,
                  y: isLoaded ? 0 : 20,
                }}
                transition={{
                  duration: 0.5,
                  delay: isLoaded ? index * 0.01 : 0,
                }}
                style={{
                  gridColumn: element.xpos,
                  gridRow: element.ypos,
                }}
                className={element.category === "lanthanide" || element.category === "actinide" ? "translate-y-4" : ""}
              >
                <ElementCard element={element} onClick={() => handleElementClick(element)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-4 md:mt-8 sticky left-0">
        <motion.div
          className="flex flex-wrap justify-center gap-1.5 md:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`relative px-2 md:px-3 py-1.5 md:py-2 rounded-lg cursor-pointer backdrop-blur-sm border-2 transition-all duration-300 ${
                selectedCategory && selectedCategory !== category.id
                  ? "opacity-60 border-gray-700/50 bg-gray-900/30"
                  : `opacity-100 border-${category.color.replace("bg-", "")}/70 bg-gray-900/70 hover:bg-gray-800/80`
              }`}
              onClick={() => handleCategoryClick(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <motion.div
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${category.color}`}
                  animate={{
                    boxShadow:
                      selectedCategory === category.id
                        ? [`0 0 8px 2px ${category.color.replace("bg-", "rgba(")}/50)`]
                        : "none",
                  }}
                  transition={{ duration: 0.5 }}
                />
                <span
                  className={`text-[10px] sm:text-xs md:text-sm font-medium ${
                    selectedCategory === category.id ? "text-white" : "text-gray-300"
                  }`}
                >
                  <span className="hidden xs:inline">{category.name}</span>
                  <span className="inline xs:hidden">{category.name.split(" ")[0]}</span>
                </span>
              </div>
              {selectedCategory === category.id && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedElement && <ElementDetails element={selectedElement} onClose={closeElementDetails} />}
      </AnimatePresence>
    </div>
  )
}


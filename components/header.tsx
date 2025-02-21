'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#a7b6a0]"
    >
      <nav className="container mx-auto px-6 py-4 flex flex-col items-center">
        <Link href="/" className="text-center">
          <div className="text-[3.5rem] font-bold font-['Helvetica'] text-black">UNIQUE VEHICLES</div>
          <div className="text-lg font-bold font-['Helvetica'] text-black mt-1">-EST. 2024-</div>
          <div className="text-lg font-bold font-['Helvetica'] text-black mt-1">BROOKLYN, NEW YORK</div>
        </Link>
        <ul className="flex space-x-10 mt-4">
          {["About", "Basement5k's Garage", "Contact"].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-black border-2 border-black px-4 py-2 rounded-md inline-block font-['Helvetica'] font-bold uppercase transition-all duration-300 ease-in-out hover:scale-110"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Tabs() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function goToEndpoint(endpoint: string) {
    router.push(`/${endpoint}`)
    setIsOpen(false) // Close the mobile menu after navigating
  }

  const tabs: {name: string, endpoint: string}[] = [
    {
      name: 'Home',
      endpoint: ''
    },
    {
      name: 'Articles',
      endpoint: 'article'
    },
    {
      name: 'Lesson',
      endpoint: 'lesson'
    },
    {
      name: 'Checking Learning',
      endpoint: 'checking_learning'
    },
    {
      name: 'Worksheets',
      endpoint: 'worksheet'
    }
  ]

  return (
    <div className="relative border-b border-gray-300 my-2">
      <div className="container mx-auto px-4">
        {/* Mobile Hamburger Icon */}
        <div className="relative">
          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Menu */}
          <div
            className={`sm:hidden fixed top-0 left-0 w-full h-full bg-black/50 z-50 transform ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform ease-in-out duration-300`}
          >
            <div className="bg-white p-4 h-full w-64">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-xl text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>

              </button>
              <ul className="flex flex-col space-y-4 mt-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.endpoint}
                    onClick={() => goToEndpoint(tab.endpoint)}
                    className={`text-left px-4 py-2 font-semibold text-gray-600 border-b-2 border-transparent transition`}
                  >
                    {tab.name}
                  </button>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Tab Buttons */}
        <div className="sm:flex hidden space-x-4 sm:justify-center pb-2 items-center">
          {tabs.map((tab) => (
            <button
              key={tab.endpoint}
              onClick={() => goToEndpoint(tab.endpoint)}
              className={`px-4 py-2 font-semibold text-gray-600 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500 transition`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

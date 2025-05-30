// src/components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// 导航项及其路径
const navItems = [
  { label: 'WORK', href: '/work' },
  { label: 'PLAY', href: '/play' },
  { label: 'ABOUT', href: '/about' },
  { label: 'RESUME', href: '/resume' },
]

export default function Header() {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  // 滚动收缩 / 回顶展开
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y > 100 && open) setOpen(false)
      if (y === 0 && !open) setOpen(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <motion.header
      layout
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 25,
        mass: 1.2,
      }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden"
      style={{
        height: 56,
        width: open ? '80vw' : 56,
        borderRadius: open ? 9999 : 28,
      }}
    >
      <div
        className={`h-full flex items-center ${
          open ? 'justify-between px-6' : 'justify-center'
        }`}
      >
        {/* 展开时：均匀分布 + 高亮当前 */}
        {open && (
          <nav className="flex flex-1 justify-evenly">
            {navItems.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`uppercase text-sm font-medium transition px-3 py-1 rounded-full ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-800 hover:text-gray-600'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        )}

        {/* 按钮：收缩时始终在中央 */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <XMarkIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>
    </motion.header>
  )
}

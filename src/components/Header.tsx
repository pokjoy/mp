// src/components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDarkMode } from './DarkModeProvider'

// 导航项及其路径
const navItems = [
  { label: 'WORK', href: '/work' },
  { label: 'PLAY', href: '/play' },
  { label: 'ABOUT', href: '/about' },
  { label: 'RESUME', href: '/resume' },
]

export default function Header() {
  const [open, setOpen] = useState(false) // 默认收缩状态
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  // 安全地使用 useDarkMode
  let isDark = false
  let toggleDarkMode = () => {}
  
  try {
    const darkMode = useDarkMode()
    isDark = darkMode.isDark
    toggleDarkMode = darkMode.toggleDarkMode
  } catch {
    // 如果不在 DarkModeProvider 内部，使用默认值
    console.log('DarkMode context not available, using defaults')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // 检测设备类型
  useEffect(() => {
    if (!mounted) return
    
    const checkDevice = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // 如果切换到桌面版，自动展开
      if (!mobile) {
        setOpen(true)
      } else {
        // 如果切换到移动版，自动收缩
        setOpen(false)
      }
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [mounted])

  // 桌面版滚动收缩/展开逻辑
  useEffect(() => {
    if (!mounted || isMobile) return // 移动版不响应滚动

    function onScroll() {
      const y = window.scrollY
      if (y > 100 && open) setOpen(false)
      if (y === 0 && !open) setOpen(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open, isMobile, mounted])

  if (!mounted) {
    // 服务端渲染或初始加载时显示简化版本
    return (
      <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg h-14 px-4 rounded-full flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-400 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </header>
    )
  }

  const getHeaderWidth = () => {
    if (isMobile) {
      return open ? '80vw' : 'auto' // 移动版展开时占80%宽度
    } else {
      return open ? '80vw' : 'auto' // 桌面版也是类似
    }
  }

  const getHeaderHeight = () => {
    return 56 // 固定高度
  }

  return (
    <motion.header
      layout
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 25,
        mass: 1.2,
      }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg overflow-hidden"
      style={{
        height: getHeaderHeight(),
        width: getHeaderWidth(),
        borderRadius: 28,
      }}
    >
      <div className="h-full flex items-center px-4">
        
        {/* 桌面版布局 */}
        {!isMobile && (
          <>
            {open ? (
              // 桌面展开状态：WORK PLAY ABOUT RESUME [🌙] [✕]
              <>
                <nav className="flex flex-1 justify-evenly">
                  {navItems.map(({ label, href }) => {
                    const isActive = pathname === href
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`uppercase text-sm font-medium transition px-3 py-1 rounded-full ${
                          isActive
                            ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                            : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
                        }`}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </nav>
                
                <div className="flex items-center gap-2 ml-4">
                  {/* 黑暗模式切换 */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? (
                      <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                    ) : (
                      <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                    )}
                  </button>
                  
                  {/* 关闭按钮 */}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                  </button>
                </div>
              </>
            ) : (
              // 桌面收缩状态：[🌙] [≡]
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? (
                    <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  )}
                </button>
                
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  aria-label="Open menu"
                >
                  <Bars3Icon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                </button>
              </div>
            )}
          </>
        )}

        {/* 移动版布局 */}
        {isMobile && (
          <>
            {open ? (
              // 移动展开状态：WORK PLAY ABOUT RESUME [🌙] [✕]
              <>
                <nav className="flex flex-1 justify-evenly">
                  {navItems.map(({ label, href }) => {
                    const isActive = pathname === href
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`uppercase text-xs font-medium transition px-2 py-1 rounded-full ${
                          isActive
                            ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                            : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
                        }`}
                        onClick={() => setOpen(false)} // 点击导航项后收缩
                      >
                        {label}
                      </Link>
                    )
                  })}
                </nav>
                
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? (
                      <SunIcon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                    ) : (
                      <MoonIcon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  </button>
                </div>
              </>
            ) : (
              // 移动收缩状态（默认）：[🌙] [≡]
              <div className="flex items-center gap-2 mx-auto">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? (
                    <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  )}
                </button>
                
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  aria-label="Open menu"
                >
                  <Bars3Icon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.header>
  )
}
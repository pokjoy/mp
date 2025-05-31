// src/components/DarkModeProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface DarkModeContextType {
  isDark: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 初始化时检查用户偏好或系统设置
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      setIsDark(JSON.parse(saved))
    } else {
      // 如果没有保存的设置，使用系统偏好
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // 更新 HTML class 和 localStorage
    console.log('DarkModeProvider: 更新模式', { isDark, mounted })
    
    if (isDark) {
      document.documentElement.classList.add('dark')
      console.log('DarkModeProvider: 添加 dark 类')
    } else {
      document.documentElement.classList.remove('dark')
      console.log('DarkModeProvider: 移除 dark 类')
    }
    localStorage.setItem('darkMode', JSON.stringify(isDark))
  }, [isDark, mounted])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  if (!mounted) {
    // 避免水合不匹配，初始渲染时不显示内容
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}
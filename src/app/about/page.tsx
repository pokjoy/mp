// src/app/about/page.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FAQ_LIST } from '@/data/faqs'
import PhotoGrid from '@/components/PhotoGrid'
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid'

export default function AboutPage() {
  // 随机选 3 条 FAQ
  const faqs = [...FAQ_LIST].sort(() => Math.random() - 0.5).slice(0, 3)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="max-w-4xl mx-auto py-16 space-y-16">
      {/* —— 个人介绍卡片 —— */}
      <section className="flex flex-col md:flex-row items-center bg-white bg-opacity-70 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
          <Image
            src="/images/qfeng5/mmexport1747563402217.jpg"
            alt="Portrait"
            width={300}
            height={450}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="md:ml-8 flex-1 space-y-4">
          <h1 className="text-4xl font-extrabold">Hi, I’m Qfeng5</h1>
          <p className="text-lg leading-relaxed">
            I create engaging, playful designs that bring joy to everyday interactions.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="/resume.pdf"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Resume
            </a>
            <a
              href="https://linkedin.com/in/qfeng5"
              target="_blank"
              className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-100 transition"
            >
              LinkedIn
            </a>
            <a
              href="mailto:qfeng5@example.com"
              className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      {/* —— 常见问答 —— */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Q & A</h2>
        <div className="space-y-12">
          {faqs.map((faq, i) => (
            <div key={i} className="relative">
              <div className="flex items-start">
                {/* 问题气泡 */}
                <div className="bg-white p-4 rounded-2xl shadow-lg flex-1">
                  {faq.question}
                </div>
                {/* 切换按钮 */}
                <button
                  onClick={() =>
                    setOpenIdx(openIdx === i ? null : i)
                  }
                  className="ml-4 mt-2 p-2 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition focus:outline-none"
                  aria-label="Toggle answer"
                >
                  {openIdx === i ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* 回答气泡（右侧对齐） */}
              {openIdx === i && (
                <div className="mt-4 flex justify-end">
                  <div className="bg-gray-50 p-4 rounded-2xl shadow-lg max-w-prose">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* —— 照片画廊 —— */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-center">Photo Gallery</h2>
        <p className="text-lg leading-relaxed mb-8 text-center">
          Here are some snapshots from my work and life.
        </p>
        <PhotoGrid
          images={[
            '/images/qfeng5/photo1.jpg',
            '/images/qfeng5/photo2.jpg',
            '/images/qfeng5/photo3.jpg',
            '/images/qfeng5/photo4.jpg',
            // …根据实际数量增删
          ]}
        />
      </section>
    </div>
  )
}

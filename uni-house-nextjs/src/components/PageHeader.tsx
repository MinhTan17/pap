'use client'

import Breadcrumb from './Breadcrumb'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbItems?: Array<{ label: string; href?: string }>
  stats?: Array<{ value: string; label: string; color?: string }>
  className?: string
}

export default function PageHeader({ 
  title, 
  description, 
  breadcrumbItems, 
  stats,
  className = '' 
}: PageHeaderProps) {
  return (
    <section className={`relative py-24 md:py-32 modern-industrial overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center mb-8 animate-fade-in-scale px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200 shadow-sm">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>

          {/* Main Title */}
          <div className="animate-slide-in-up">
            <h1 className="heading-primary text-slate-800 mb-6">
              <span className="gradient-text">{title}</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full mx-auto mb-8"></div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed animate-slide-in-up" 
               style={{ animationDelay: '0.2s' }}>
              {description}
            </p>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8 mt-16 animate-slide-in-up`} 
                 style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${stat.color || 'text-blue-600'}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
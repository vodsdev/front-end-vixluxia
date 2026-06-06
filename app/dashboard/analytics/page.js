import React from 'react';
import { Eye, Copy, DollarSign, Users, Activity, MoreHorizontal, ArrowUpRight, Download, Share2 } from 'lucide-react';

export default function AnalyticsDashboard() {
  const stats = [
    { title: "Total Views", value: "2.4M", change: "+12.5%", icon: Eye, trend: "up" },
    { title: "Copies", value: "84.2K", change: "+8.2%", icon: Copy, trend: "up" },
    { title: "Revenue", value: "$12,450", change: "+24.1%", icon: DollarSign, trend: "up" },
    { title: "Active Users", value: "14.2K", change: "-2.4%", icon: Users, trend: "down" }
  ];

  const chartData = [
    { label: "Jan", value: 45 },
    { label: "Feb", value: 52 },
    { label: "Mar", value: 38 },
    { label: "Apr", value: 65 },
    { label: "May", value: 85 },
    { label: "Jun", value: 72 },
    { label: "Jul", value: 90 },
    { label: "Aug", value: 110 },
    { label: "Sep", value: 85 },
    { label: "Oct", value: 95 },
    { label: "Nov", value: 120 },
    { label: "Dec", value: 135 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Overview of your component performance and revenue.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors shadow-sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <div className="p-2 bg-secondary/50 rounded-md">
                  <stat.icon className="h-4 w-4 text-foreground/70" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change} <span className="text-muted-foreground font-normal ml-1">from last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="col-span-1 lg:col-span-2 p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-semibold">Revenue Overview</h3>
                <p className="text-sm text-muted-foreground mt-1">Monthly revenue for the current year</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  Revenue
                </span>
              </div>
            </div>
            
            {/* CSS Flex Bar Chart */}
            <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-1 sm:gap-2 md:gap-4 mt-8 pt-4 border-b border-border/50 relative">
              {/* Y-axis lines (decorative) */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none -z-10">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-full border-t border-border/30 h-0" />
                ))}
              </div>

              {chartData.map((data, idx) => {
                const heightPercentage = (data.value / maxValue) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group h-full justify-end">
                    <div className="relative w-full flex justify-center flex-1 items-end">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-popover text-popover-foreground text-xs rounded-md py-1.5 px-2.5 pointer-events-none transition-all duration-200 whitespace-nowrap z-10 shadow-lg border -translate-y-2 group-hover:translate-y-0">
                        ${data.value}k
                      </div>
                      <div 
                        className="w-full max-w-[48px] bg-primary/10 group-hover:bg-primary/20 rounded-t-sm transition-all duration-300 relative overflow-hidden"
                        style={{ height: `${heightPercentage}%` }}
                      >
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-primary/80 group-hover:bg-primary w-full transition-all duration-500"
                          style={{ height: '100%' }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground mt-3 font-medium">
                      {data.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity / Secondary Stats */}
          <div className="col-span-1 p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Top Components</h3>
                <p className="text-sm text-muted-foreground mt-1">By sales volume</p>
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col gap-5 justify-between">
              {[
                { name: "Hero Section Pro", views: "124k", sales: 432 },
                { name: "Pricing Table UI", views: "98k", sales: 321 },
                { name: "Auth Modal Template", views: "85k", sales: 215 },
                { name: "Dashboard Layout", views: "72k", sales: 198 },
                { name: "Settings Navigation", views: "45k", sales: 120 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-none mb-1.5 group-hover:text-primary transition-colors">{item.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {item.views}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold leading-none mb-1.5">{item.sales}</p>
                      <p className="text-xs text-muted-foreground">sales</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 border rounded-lg text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors group flex items-center justify-center gap-2">
              View All Components
              <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

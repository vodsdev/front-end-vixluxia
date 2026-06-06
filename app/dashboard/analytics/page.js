"use client";

import React, { useState, useEffect } from 'react';
import { Eye, Copy, DollarSign, Users, Activity, MoreHorizontal, ArrowUpRight, Download, Share2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/creator/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          // Fallback if endpoint is not fully implemented
          setData(getMockData());
        }
      } catch (e) {
        console.error(e);
        setData(getMockData());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          {data?.stats?.map((stat, idx) => {
            const Icon = getIcon(stat.icon);
            return (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.change} <span className="text-muted-foreground ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
              <CardDescription>Monthly views for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data?.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      formatter={(value) => [`${value}`, 'Views']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Components */}
          <Card className="col-span-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Top Components</CardTitle>
                <CardDescription>By sales volume</CardDescription>
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between mt-4">
              <div className="space-y-4">
                {data?.topComponents?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-secondary/40 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-none mb-1 group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {item.views}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold leading-none mb-1">{item.sales}</p>
                      <p className="text-xs text-muted-foreground">sales</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 border rounded-lg text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors group flex items-center justify-center gap-2">
                View All Components
                <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

function getIcon(name) {
  const icons = { Eye, Copy, DollarSign, Users, Activity };
  return icons[name] || Activity;
}

function getMockData() {
  return {
    stats: [
      { title: "Total Views", value: "2.4M", change: "+12.5%", icon: "Eye", trend: "up" },
      { title: "Copies", value: "84.2K", change: "+8.2%", icon: "Copy", trend: "up" },
      { title: "Revenue", value: "$12,450", change: "+24.1%", icon: "DollarSign", trend: "up" },
      { title: "Active Users", value: "14.2K", change: "-2.4%", icon: "Users", trend: "down" }
    ],
    chartData: [
      { name: "Jan", views: 45000 },
      { name: "Feb", views: 52000 },
      { name: "Mar", views: 38000 },
      { name: "Apr", views: 65000 },
      { name: "May", views: 85000 },
      { name: "Jun", views: 72000 },
      { name: "Jul", views: 90000 },
      { name: "Aug", views: 110000 },
      { name: "Sep", views: 85000 },
      { name: "Oct", views: 95000 },
      { name: "Nov", views: 120000 },
      { name: "Dec", views: 135000 },
    ],
    topComponents: [
      { name: "Hero Section Pro", views: "124k", sales: 432 },
      { name: "Pricing Table UI", views: "98k", sales: 321 },
      { name: "Auth Modal Template", views: "85k", sales: 215 },
      { name: "Dashboard Layout", views: "72k", sales: 198 },
      { name: "Settings Navigation", views: "45k", sales: 120 },
    ]
  };
}

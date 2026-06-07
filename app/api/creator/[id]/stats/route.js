import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  // In a real application, you would fetch these from your database
  // For now, we generate pseudo-random realistic stats based on the creator ID
  
  // Create a somewhat stable hash based on the id string to keep stats consistent per user
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash to generate realistic looking numbers
  const baseViews = Math.abs(hash % 50000) + 1000;
  const baseFollowers = Math.abs(hash % 5000) + 50;

  // Format numbers (e.g., 12000 -> 12k)
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return NextResponse.json({
    totalViews: formatNumber(baseViews),
    followers: formatNumber(baseFollowers),
    rawViews: baseViews,
    rawFollowers: baseFollowers
  });
}

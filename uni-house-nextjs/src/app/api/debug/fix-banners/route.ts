import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // Get all banners
    const allBanners = await db.collection('banners').find({}).toArray();
    console.log('Total banners in DB:', allBanners.length);
    
    // Find unique banners by id
    const uniqueBanners = [];
    const seenIds = new Set();
    
    for (const banner of allBanners) {
      if (!seenIds.has(banner.id)) {
        seenIds.add(banner.id);
        uniqueBanners.push(banner);
      }
    }
    
    console.log('Unique banners:', uniqueBanners.length);
    
    // If there are duplicates, fix them
    if (allBanners.length !== uniqueBanners.length) {
      // Clear and re-insert unique banners
      await db.collection('banners').deleteMany({});
      if (uniqueBanners.length > 0) {
        await db.collection('banners').insertMany(uniqueBanners);
      }
      
      return NextResponse.json({
        success: true,
        message: `Fixed! Removed ${allBanners.length - uniqueBanners.length} duplicate banners`,
        before: allBanners.length,
        after: uniqueBanners.length,
        banners: uniqueBanners.map(b => ({ id: b.id, title: b.title, image: b.image }))
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'No duplicates found',
      count: allBanners.length,
      banners: allBanners.map(b => ({ id: b.id, title: b.title, image: b.image }))
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      error: 'Failed to fix banners',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

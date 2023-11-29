import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
	try {
		const { userId } = auth();
		const { title } = await req.json();

		if (!userId) return new NextResponse('Unauthorized', { status: 401 });

		const course = await db.course.create({
			data: { userId, title },
		});

		return NextResponse.json(course);
	} catch (error: any) {
		console.log('[courses]:', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

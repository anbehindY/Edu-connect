import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { userId } = auth();
		const courseId = params.id;
		const values = await req.json();

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values
      },
    })

    return NextResponse.json(course)
	} catch (error: any) {
		console.log('[courseId]', error.message);
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status }
		);
	}
}

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        userId: userId,
        id: params.id,
      }
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { title } = await req.json();

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.id,
      },
      orderBy: {
        position: 'desc',
      },
    })

    const position = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title: title,
        position: position,
        courseId: params.id,
      }
    })
    
    return NextResponse.json(chapter);
	} catch (error: any) {
    console.error("Chapter creation error",error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

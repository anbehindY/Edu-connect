import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";

const CourseDetail = async ({
  params
}: {
  params: {
    id: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const course = await db.course.findFirst({
    where: {
      id: params.id,
      userId
    }
  });

  if (!course) redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ]

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionIndicator = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl font-semibold mb-4">Course Setup</h1>
        <span className="text-sm text-slate-700">Complete all fields {completionIndicator}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm courseData={course} courseId={params.id} />
          <DescriptionForm courseData={course} courseId={params.id} />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;

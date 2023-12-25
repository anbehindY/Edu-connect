import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { DollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";

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
    },
    include: {
      attachments: {
        orderBy: {
          createdAT: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    }
  })

  console.log(categories)
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
    <div className="px-8 py-10">
      <div className="flex justify-center items-start flex-col">
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
          <ImageForm courseData={course} courseId={params.id} />
          <CategoryForm
            courseData={course}
            courseId={params.id}
            options={categories.map(category => {
              return {
                label: category.name,
                value: category.id
              }
            })}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course Chapters</h2>
            </div>
            <div>
              TODO: Chapters
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={DollarSign} />
              <h2 className="text-xl">Pricing</h2>
            </div>
            <PriceForm courseData={course} courseId={params.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Course Resources</h2>
            </div>
            <AttachmentForm courseData={course} courseId={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;

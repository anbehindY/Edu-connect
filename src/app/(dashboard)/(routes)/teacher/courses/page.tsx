'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Link href={'/teacher/courses/create'}>
        <Button>New Course</Button>
      </Link>
    </div>
  );
}

export default CoursesPage;

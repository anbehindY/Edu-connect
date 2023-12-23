'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Course } from '@prisma/client';
import { Input } from '@/components/ui/input';
import priceFormatter from '@/lib/priceFormatter';

const formSchema = z.object({
  price: z.coerce.number(),
});

interface PriceFormProps {
  courseData: Course;
  courseId: string;
}

const PriceForm = ({
  courseData,
  courseId,
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: courseData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course description updated');
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='flex justify-between items-center font-medium mb-3'>
        Course price
        <Button variant='ghost' onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : <><Pencil className='h-4 w-4 mr-2' />
            Edit price</>}
        </Button>
      </div>
      {isEditing ?
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      step={0.01}
                      disabled={isSubmitting}
                      placeholder="Set the price of your course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
        : <div className='text-sm'>{ courseData.price ? priceFormatter(courseData.price) : 'Price not assigned yet!'}</div>}
    </div>
  );
}

export default PriceForm;

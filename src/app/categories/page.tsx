"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Input from "@/shared/Input/Input";
import {Category, CategoryApi} from '../../../luugoapi';
import DoesNotExist from '@/components/DoesNotExist/DoesNotExist';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryApi = new CategoryApi();
      setCategories(await categoryApi?.categoryGet());
    }

    fetchCategories()
  }, [])


  return (
    <div className={`nc-PageCategories`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-14">
        <div className="space-y-10 lg:space-y-34">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Categorias
            </h2>
          </div>
        </div>
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
        </header>
        <hr className="border-slate-200 dark:border-slate-700"/>
        {categories?.length ? (
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
            {categories?.map((item) => (
              <Link href={`/category/${item?.id}`} key={item?.id}>
                <div
                  className="p-6 text-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
                >
                  <h3
                    className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <DoesNotExist title={'categorias'}/>
        )
        }
      </div>
    </div>
  )
};

export default Categories;
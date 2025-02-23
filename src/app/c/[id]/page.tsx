import { Category, CategoryApi } from "@api";
import Categories from "./categories";
import { notFound } from "next/navigation";

export interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getCategoryData(categoryId: string) {
  const categoryApi = new CategoryApi();
  const category: Category[] = await categoryApi.categoryGet({
    id: categoryId,
  });

  return category[0] || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const category = await getCategoryData((await params).id);

  return {
    title: `${category?.title || "Categoria"} | Luugo`,
    description: `Encontre os melhores produtos para aluguel na categoria ${category?.title || ""}.`,
    openGraph: {
      title: `${category?.title || "Categoria"} | Luugo`,
      description: `Encontre os melhores produtos para aluguel na categoria ${category?.title || ""}.`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!params || !(await params).id) {
    console.error("🚨 params está indefinido!");
    notFound();
  }

  const category = await getCategoryData((await params).id);

  if (!category) {
    notFound();
  }

  return <Categories id={category.id || ""} />;
}

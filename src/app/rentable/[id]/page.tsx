import ProductDetail from "./RentablePage";
import { Metadata } from "next";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { RentableApi } from "@api";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const rentableApi = new RentableApi();

  const productData = await rentableApi
    .rentableGet({ id })
    .then(async (rentables) => {
      return rentables;
    });

  const productDescription = await remark()
    .use(remarkHtml)
    .process(productData[0].description)
    .then((content) => content.toString());

  const MetaDescription = productDescription
    .replace(/<[^>]*>/g, "")
    .replace(/\n+/g, " ")
    .trim();

  const Product = {
    title: productData[0].title,
    thumbnail: productData[0].thumbnail,
    description: productDescription,
    metadescription: MetaDescription,
  };

  return {
    openGraph: {
      title: Product.title,
      description: Product.metadescription,
      images: Product.thumbnail
        ? [Product.thumbnail]
        : "metadata/thumbnail_default.png",
    },
  };
}

function ProductDetailPage() {
  return (
    <>
      <ProductDetail />
    </>
  );
}

export default ProductDetailPage;

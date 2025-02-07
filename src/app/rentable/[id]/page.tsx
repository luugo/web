import ProductDetail from "./RentablePage";
import { remark } from "remark";
import remarkHtml from "remark-html";
import html from "remark-html";
import {
  Media,
  MediaApi,
  Rentable,
  RentableApi,
  RentableGeolocation,
  UserContact,
  UserContactApi,
  UserContactGetRequest,
} from "@api";
import NotFound from "@/app/not-found";

export interface dataProduct {
  id: string;
  title: string;
  description: string;
  metadescription: string;
  thumbnail: string | null | undefined;
  images: Array<object>;
  price: number;
  billingFrequency: string;
  geolocation: RentableGeolocation;
  user: {
    id: string;
    social: UserContact[];
  };
}

async function getRentable(id: string) {
  const rentableApi = new RentableApi();
  const mediaApi = new MediaApi();

  const productData: Rentable[] = await rentableApi.rentableGet({ id });
  if (productData.length === 0) {
    return;
  }
  const productImages: Media[] = await mediaApi.mediaGet({ rentableId: id });
  const productUserInfo: UserContact[] = await getProductUserInfo(
    productData[0].userId,
  );

  const productDescription = await remark()
    .use(html)
    .process(productData[0].description)
    .then((content) => content.toString());

  const productMetaDescription = await remark()
    .use(remarkHtml)
    .process(productData[0].description)
    .then((content) => content.toString());

  const MetaDescription = productMetaDescription
    .replace(/<[^>]*>/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return {
    id: id,
    title: productData[0].title,
    description: productDescription,
    metadescription: MetaDescription,
    thumbnail: productData[0].thumbnail,
    images: productImages,
    price: productData[0].price,
    billingFrequency: productData[0].billingFrequency,
    geolocation: productData[0].geolocation,
    user: {
      id: productData[0].userId,
      social: productUserInfo,
    },
  };
}

async function getProductUserInfo(userId: string) {
  const userContactApi = new UserContactApi();
  const requestUserContactParameters: UserContactGetRequest = {
    userId: userId,
  };

  return userContactApi.userContactGet(requestUserContactParameters);
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await props.params;
  const rentable = await getRentable(resolvedParams.id);

  if (!rentable) return {};

  return {
    title: `${rentable.title} | Luugo`,
    openGraph: {
      title: rentable.title,
      description: rentable.metadescription,
      images: rentable.thumbnail
        ? [rentable.thumbnail]
        : "metadata/thumbnail_default.png",
    },
  };
}

async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const resolvedParams = await props.params;
  const rentable = await getRentable(resolvedParams.id);
  if (!rentable) return <NotFound />;

  return (
    <>
      <ProductDetail {...rentable} />
    </>
  );
}

export default ProductDetailPage;

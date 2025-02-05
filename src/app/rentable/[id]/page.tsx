import ProductDetail from "./RentablePage";
import {remark} from "remark";
import remarkHtml from "remark-html";
import html from "remark-html";
import {MediaApi, RentableApi, RentableGeolocation, UserContact, UserContactApi, UserContactGetRequest,} from "@api";

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

async function getProduct(id: string) {
  const rentableApi = new RentableApi();
  const mediaApi = new MediaApi();

  const productData = await rentableApi.rentableGet({id});
  const productImages = await mediaApi.mediaGet({rentableId: id});
  const productUserInfo = await getProductUserInfo(productData[0].userId);

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
  const Product = await getProduct(resolvedParams.id);

  return {
    title: `${Product.title} | Luugo`,
    openGraph: {
      title: Product.title,
      description: Product.metadescription,
      images: Product.thumbnail
        ? [Product.thumbnail]
        : "metadata/thumbnail_default.png",
    },
  };
}

async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const resolvedParams = await props.params;
  const data = await getProduct(resolvedParams.id);

  return (
    <>
      <ProductDetail {...data} />
    </>
  );
}

export default ProductDetailPage;

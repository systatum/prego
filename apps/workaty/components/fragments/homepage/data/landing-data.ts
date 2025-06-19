import {
  UberImage,
  MetaImage,
  AdobeImage,
  PaypalImage,
  PinterestImage,
  SquareImage,
} from "@/public/assets/landingPage";
import { useTranslations } from "next-intl";

export const DataHeroImage = [
  {
    title: "Access Pinterest on Workaty",
    image: PinterestImage,
    link: "https://www.pinterest.com",
  },
  {
    title: "Access Uber on Workaty",
    image: UberImage,
    link: "https://www.uber.com",
  },
  {
    title: "Access Meta on Workaty",
    image: MetaImage,
    link: "https://www.meta.com",
  },
  {
    title: "Access Adobe on Workaty",
    image: AdobeImage,
    link: "https://www.adobe.com",
  },
  {
    title: "Access Paypal on Workaty",
    image: PaypalImage,
    link: "https://www.paypal.com",
  },

  {
    title: "Access Square on Workaty",
    image: SquareImage,
    link: "https://www.squareup.com",
  },
];

export const useHeroSectionData = (): [string, string] => {
  const t = useTranslations("landingPage.heroSection");
  return [t("title1"), t("title2")];
};

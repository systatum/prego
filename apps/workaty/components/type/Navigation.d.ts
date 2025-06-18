import { StaticImageData } from "next/image";

export interface HomePageNavbarChildMenuItemsProps {
  titleChild: string;
  link: string;
}

export interface HomePageNavbarMenuItemsProps {
  title: string;
  type: "dropdown";
  data: HomePageNavbarChildMenuItemsProps[];
}

export interface FooterItems {
  title: string;
  link: string;
}

export interface HomePageFooterItems {
  category: string;
  items: FooterItems[];
}

export interface HomePageSosmedFooterItems {
  title: string;
  logo: StaticImageData;
  link: string;
}

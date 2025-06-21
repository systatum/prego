import {
  FacebookImage,
  InstagramImage,
  LinkedinImage,
  XImage,
} from "@/public/assets/navigation";
import { useTranslations } from "next-intl";
import {
  HomePageFooterItems,
  HomePageNavbarMenuItemsProps,
  HomePageSosmedFooterItems,
} from "../type/Navigation";

export const useHomePageNavbarItems = () => {
  const tNav = useTranslations("navigation.navbar");

  const HOMEPAGE_MENU_NAVBAR: HomePageNavbarMenuItemsProps[] = [
    {
      title: tNav("usage"),
      type: "dropdown",
      data: [
        {
          titleChild: tNav("hiringCandidates"),
          link: `/hiring`,
        },
        {
          titleChild: tNav("recording"),
          link: "#",
        },
        {
          titleChild: tNav("knowledgeWiki"),
          link: "#",
        },
      ],
    },
    {
      title: tNav("learn"),
      type: "dropdown",
      data: [
        {
          titleChild: tNav("helpCenters"),
          link: "#",
        },
        {
          titleChild: tNav("customerStories"),
          link: "#",
        },
        {
          titleChild: tNav("aboutUs"),
          link: "#",
        },
      ],
    },
  ];

  const HOMEPAGE_FOOTER_LINK_ITEMS: HomePageFooterItems[] = [
    {
      category: "Pages",
      items: [
        { title: "Web Design", link: "" },
        { title: "Development", link: "" },
        { title: "Wordpress", link: "" },
        { title: "Online Marketing", link: "" },
        { title: "SEO Marketing", link: "" },
      ],
    },
    {
      category: "Service",
      items: [
        { title: "Changelog", link: "" },
        { title: "Customer Support", link: "" },
        { title: "Documentation", link: "" },
        { title: "Pagebuilder", link: "" },
        { title: "Popular Campaign", link: "" },
      ],
    },
    {
      category: "Legal",
      items: [
        { title: "Page Builder", link: "" },
        { title: "UI Kit", link: "" },
        { title: "Styleguide", link: "" },
        { title: "Documentation", link: "" },
        { title: "Changelog", link: "" },
      ],
    },
  ];

  const HOMEPAGE_SOCIAL_MEDIA_ACCOUNTS: HomePageSosmedFooterItems[] = [
    {
      title: "Facebook",
      logo: FacebookImage,
      link: "",
    },
    {
      title: "Twitter",
      logo: XImage,
      link: "",
    },
    {
      title: "LinkedIn",
      logo: LinkedinImage,
      link: "",
    },
    {
      title: "Instagram",
      logo: InstagramImage,
      link: "",
    },
  ];

  return {
    HOMEPAGE_FOOTER_LINK_ITEMS,
    HOMEPAGE_MENU_NAVBAR,
    HOMEPAGE_SOCIAL_MEDIA_ACCOUNTS,
  };
};

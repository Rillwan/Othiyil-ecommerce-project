import { VscGraphLine } from "react-icons/vsc";
import { FaHandshake } from "react-icons/fa6";
import { Ri24HoursLine } from "react-icons/ri";
import AboutImg1 from "../../../assets/images/about-1.jpg";
import AboutImg2 from "../../../assets/images/about-2.jpg";
import BannerImg1 from "../../../assets/images/banner-1.jpg";
import BannerImg2 from "../../../assets/images/banner-2.jpg";
import BannerImg3 from "../../../assets/images/banner-3.jpg";

export const HomeData = {
  hero_section: [
    {
      title: "Built for Strength, Designed for Beauty",
      description: "Durable plywood and boards crafted for modern living.",
      img: BannerImg1,
    },
    {
      title: "Transform Your Bathroom into a Style Statement",
      description: "Upgrade with modern showers and sleek sanitary fittings.",
      img: BannerImg2,
    },
    {
      title: "Design Every Step with Elegance",
      description:
        "Tiles, panels, and stones that redefine your walls and floors.",
      img: BannerImg3,
    },
  ],
  about_section: {
    title: "Your One-Stop Showroom for Home & Building Solutions",
    description: `At Othiyil, we go beyond just being a showroom – we are your trusted partner in creating beautiful and durable homes. From premium boards,
       laminates, and flooring to modern kitchen solutions, bathroom fittings, and hardware accessories, we bring together the world’s most 
       reliable brands under one roof.
       With our wide range of products and expert guidance, we help homeowners, architects, and builders bring their vision to life with confidence.`,
  },
  whyChooseUs: [
    {
      title: "Wide Range of Premium Brands",
      Icon: VscGraphLine,
      description:
        "We partner with the most trusted Indian and international brands to bring you a diverse selection of boards, laminates, tiles, kitchen fittings, bathroom solutions, and more - all under one roof",
    },
    {
      title: "Quality You Can Trust",
      Icon: FaHandshake,
      description:
        "Every product at Othiyil is carefully curated for durability, performance, and style. Our focus on genuine and certified products ensures lasting value for your home or project.",
    },
    {
      title: "Expertise & Customer Support",
      Icon: Ri24HoursLine,
      description:
        "With years of industry experience, our team provides expert guidance to homeowners, architects, and builders. From choosing the right materials to after-sales support, we make your journey smooth and hassle-free.",
    },
  ],
};

export const AboutData = {
  images: [AboutImg1, AboutImg2],
  banner1: AboutImg1,
  banner2: AboutImg2,
};

"use client";

import { cn } from "@/lib/utils";
import { RiCloseFill } from "@remixicon/react";
import { AnimatePresence, motion, easeIn, easeOut } from "framer-motion";
import React, { Fragment, useMemo, useState } from "react";
import TitleSection from "./../../../../../packages/components/layout/title";
import { useTranslation } from "react-i18next";

interface ProfileCollaboratorProps {
  id: number;
  name_short: string;
  name_long: string;
  teams: { short: string; long: string };
  bio: string;
  profile_picture_url: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const expandVariants = {
  initial: { opacity: 0, height: 0, y: -20 },
  animate: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: easeIn,
    },
  },
};

const TEAMS = {
  ceo: { short: "CEO", long: "Chief Executive Officer" },
  mots_fe: { short: "MOTS", long: "Member of Technical Staff, Front-end" },
  imots_pl: {
    short: "IMOTS",
    long: "Intern Member of Technical Staff, Programing Language Research Laboratory",
  },
  imots_be: {
    short: "IMOTS",
    long: "Intern Member of Technical Staff, Backend Engineering",
  },
  pop: { short: "People", long: "People Operations" },
};

const PROFILE_COLLABORATOR: ProfileCollaboratorProps[] = [
  {
    id: 1,
    name_short: "Adam",
    name_long: "Adam N. Hakarsa",
    teams: TEAMS["ceo"],
    bio: "His interest in software began at age 10 when he built a Windows application for his father's campus. He now leads Systatum across product and engineering, working primarily with Ruby, Crystal, TypeScript, and React. He enjoys tackling complex challenges through research and careful problem solving.",
    profile_picture_url: "/profile/profile-adam.jpeg",
  },
  {
    id: 2,
    name_short: "Alim",
    name_long: "Alim Naufal",
    teams: TEAMS["mots_fe"],
    bio: "Passionate Frontend Engineer with a keen eye for user experience and modern web technologies. I love creating intuitive interfaces that bridge the gap between complex functionality and user-friendly design. I hope to bring more value to others through the web—building things that are not only useful, but also meaningful.",
    profile_picture_url: "profile/profile-alim.jpeg",
  },
  {
    id: 3,
    name_short: "Salwa",
    name_long: "Salwa Gusmy",
    teams: TEAMS["pop"],
    bio: "Business Management and Digitalization are inseparable in today's companies across all sectors. Having Bachelor in Business Management, I'm particularly drawn to the Digital Marketing industry since it's fascinating to realize that marketing goes far beyond just creating products—it is how you understand the psychological factors of your consumer behavior.",
    profile_picture_url: "profile/profile-salwa.jpg",
  },
  {
    id: 4,
    name_short: "Rahfi",
    name_long: "Rahfi Alyendra Gibran",
    teams: TEAMS["imots_pl"],
    bio: "Software engineer focused on infrastructure and security. Interested in decentralized systems (aka blockchain), especially where performance, reliability, security, and governance matter most. Lifelong learner that always like to learn from mistakes.",
    profile_picture_url: "profile/profile-rahfi.PNG",
  },
  {
    id: 5,
    name_short: "Kade",
    name_long: "Kade Satrya",
    teams: TEAMS["imots_pl"],
    bio: "Software engineer by day and by night. Loves tackling complex and unique problems that are 'behind the scenes'. Regularly consults refactoring guru like some sort of a holy scripture. If I could choose any superpower, I'd pick the one my father has - the ability to fall asleep in under two minutes.",
    profile_picture_url: "profile/profile-kade.jpeg",
  },
  {
    id: 6,
    name_short: "Kent",
    name_long: "Kent Alber Fredson",
    teams: TEAMS["imots_pl"],
    bio: "I'm someone who loves learning, working with data, and keeping traditions alive. Always exploring new ideas and growing step by step.",
    profile_picture_url: "profile/profile-kent.JPG",
  },
  {
    id: 7,
    name_short: "Gilberdi",
    name_long: "Gilberdi Axel Nathaniel Sinaga",
    teams: TEAMS["imots_pl"],
    bio: "Computer science student who loves building things with code, especially on the backend. Curious about programming languages, philosophy, and books that bend your brain. Bilingual in Indonesian and English.",
    profile_picture_url: "profile/profile-gilberdi.jpeg",
  },
  {
    id: 8,
    name_short: "Ceavin",
    name_long: "Ceavin Rufus De Prayer Purba",
    teams: TEAMS["imots_pl"],
    bio: "I've been passionate about programming since junior high school, and over time it naturally led me to pursue both coding and entrepreneurship. I try to approach my work with purpose and responsibility, because as a Wise Man once said, serve others.",
    profile_picture_url: "profile/profile-ceavin.JPG",
  },
  {
    id: 9,
    name_short: "Alib",
    name_long: "Ahmad Ghalib Athariq",
    teams: TEAMS["imots_be"],
    bio: "Alib enjoys building software, exploring new programming concepts, and spending his free time watching educational videos or reading about everything from technology to philosophy. His childhood dream of becoming a professor reflects the curiosity that continues to drive both his work and hobbies.",
    profile_picture_url: "profile/profile-alib.jpeg",
  },
];

export function Collaborator() {
  const { t } = useTranslation();

  const tCollaborator = (key: string) =>
    t(`landingPage.collaboratorSection.${key}`);

  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [expandedProfile, setExpandedProfile] =
    useState<ProfileCollaboratorProps | null>(null);

  const isTablet = typeof window !== "undefined" && window.innerWidth < 768;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 430;

  const contentCollaborator = useMemo(() => {
    if (!isMobile && !isTablet) {
      return PROFILE_COLLABORATOR.map((data) => [data]);
    }

    return PROFILE_COLLABORATOR.reduce<ProfileCollaboratorProps[][]>(
      (acc, profile, index) => {
        const indexPerContent = isMobile ? 1 : 2;
        const pairIndex = Math.floor(index / indexPerContent);

        if (!acc[pairIndex]) {
          acc[pairIndex] = [];
        }

        acc[pairIndex].push(profile);

        return acc;
      },
      [],
    );
  }, [isMobile, isTablet]);

  return (
    <div className="pt-24 pb-32 bg-gray-50 flex justify-center flex-col gap-20">
      <TitleSection className="text-black">
        {tCollaborator("title")}
      </TitleSection>
      <div className="flex flex-col gap-10">
        <div
          className={cn(
            "flex flex-wrap items-center justify-center lg:justify-start gap-10 px-4 md:px-10",
            PROFILE_COLLABORATOR.length > 4 &&
              "sm:grid sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
          )}
        >
          {contentCollaborator.map((data, dataIndex) => {
            const shouldShowExpanded = data?.some(
              (p) => expandedProfile?.id === p.id,
            );

            return (
              <Fragment key={`pair-${dataIndex}`}>
                {data.map((profile) => (
                  <motion.div
                    key={profile.id}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onClick={() => {
                      if (
                        expandedProfile === null ||
                        expandedProfile.id !== profile.id
                      ) {
                        setExpandedProfile(profile);
                        setIsHovered(profile.id);
                      } else if (profile.id === isHovered) {
                        setExpandedProfile(null);
                      }
                    }}
                    onMouseLeave={() => {
                      setIsHovered(null);
                    }}
                    onMouseEnter={() => {
                      setIsHovered(profile.id);
                    }}
                    className="relative flex items-center justify-center cursor-pointer min-w-45 w-fit h-full"
                  >
                    <div
                      className={cn(
                        "border rounded-full transition-transform duration-300",
                        (isHovered === profile.id ||
                          (expandedProfile &&
                            expandedProfile.id === profile.id)) &&
                          "border-blue-500 scale-110",
                      )}
                    >
                      <div
                        className={cn(
                          "w-40 h-40 rounded-full border border-transparent bg-white overflow-hidden",
                          (isHovered === profile.id ||
                            (expandedProfile &&
                              expandedProfile.id === profile.id)) &&
                            "border-4 border-transparent",
                        )}
                      >
                        <div className="relative w-full h-full">
                          {isHovered === profile.id ||
                          (expandedProfile &&
                            expandedProfile.id === profile.id) ? (
                            <img
                              src={profile.profile_picture_url}
                              alt={`Profile Collaborator Systatum ${profile.name_long}`}
                              width={160}
                              height={160}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <img
                              src={profile.profile_picture_url}
                              alt={`Profile Collaborator Systatum ${profile.name_long}`}
                              width={160}
                              height={160}
                              className="object-cover w-full h-full blur-sm"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col absolute -top-1 z-10 left-0">
                      <span
                        className={cn(
                          "font-semibold text-shadow",
                          isHovered === profile.id && "text-blue-800",
                        )}
                      >
                        {profile.name_short}
                      </span>
                      <span className="text-sm font-medium bg-white w-fit border border-gray-200 shadow-xs px-2">
                        #{profile.teams.short}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {shouldShowExpanded && (
                  <motion.div
                    id="content-profile"
                    className="px-4 sm:hidden flex sm:px-0 w-full"
                  >
                    <div className="bg-white w-full border-gray-200 rounded-xs shadow-xs max-w-145 sm:max-w-full p-6 relative">
                      <button
                        onClick={() => {
                          setIsHovered(null);
                          setExpandedProfile(null);
                        }}
                        className="cursor-pointer absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xs transition-colors duration-200"
                        aria-label="Close profile"
                      >
                        <RiCloseFill className="w-5 h-5 text-gray-500" />
                      </button>

                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="shrink-0">
                          <div className="w-32 h-32 rounded-xs overflow-hidden border border-gray-300">
                            <img
                              src={expandedProfile!.profile_picture_url}
                              alt={`Profile of ${expandedProfile!.name_long}`}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <h3 className="text-4xl md:text-2xl font-bold text-gray-900">
                              {expandedProfile!.name_long}
                            </h3>
                            <p className="text-base md:text-lg text-gray-600">
                              {expandedProfile!.teams.long}
                            </p>
                          </div>

                          <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {expandedProfile!.bio}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Fragment>
            );
          })}
        </div>

        <AnimatePresence>
          {expandedProfile !== null && (
            <motion.div
              id="content-profile"
              variants={expandVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-12 px-4 sm:flex sm:px-0 hidden w-full"
            >
              <div className="bg-white w-full border-gray-200 rounded-xs shadow-xs max-w-145 sm:max-w-full p-6 relative">
                <button
                  onClick={() => {
                    setIsHovered(null);
                    setExpandedProfile(null);
                  }}
                  className="cursor-pointer absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xs transition-colors duration-200"
                  aria-label="Close profile"
                >
                  <RiCloseFill className="w-5 h-5 text-gray-500" />
                </button>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0">
                    <div className="w-32 h-32 rounded-xs overflow-hidden border border-gray-300">
                      <img
                        src={expandedProfile.profile_picture_url}
                        alt={`Profile of ${expandedProfile.name_long}`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h3 className="text-4xl md:text-2xl font-bold text-gray-900">
                        {expandedProfile.name_long}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600">
                        {expandedProfile.teams.long}
                      </p>
                    </div>

                    <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {expandedProfile.bio}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

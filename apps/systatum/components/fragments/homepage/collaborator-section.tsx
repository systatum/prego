"use client";

import { cn } from "@/lib/utils";
import { RiCloseFill } from "@remixicon/react";
import { AnimatePresence, motion, easeIn, easeOut } from "framer-motion";
import { useState } from "react";
import { scrollToId } from "./../../../../../packages/components/tools/scroll-to-id";

interface ProfileCollaboratorProps {
  id: number;
  name_short: string;
  name_long: string;
  teams: { short: string; long: string };
  bio: string;
  profile_picture_url: string;
}

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
};

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
  pop: { short: "People", long: "People Operations" },
};

const PROFILE_COLLABORATOR: ProfileCollaboratorProps[] = [
  {
    id: 1,
    name_short: "Adam",
    name_long: "Adam N. Hakarsa",
    teams: TEAMS["ceo"],
    bio: "I started software engineering early at 10 by building a Windows app for my dad’s campus. I was fascinated right-away with how people and technology inter-connect. At Harvard, I learned how to design a better, smarter systems. I'd say: be human.",
    profile_picture_url: "/profile/profile-adam.png",
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
    bio: "Business Management and Digitalization are inseparable in today’s companies across all sectors. As a Bachelor in Business Management, I’m particularly drawn to the Digital Marketing industry since it's fascinating to realize that marketing goes far beyond just creating products—it is how you understand the psychological factors of your consumer behavior.",
    profile_picture_url: "profile/profile-salwa.jpg",
  },
  {
    id: 4,
    name_short: "Rahfi",
    name_long: "Rahfi Alyendra",
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
    profile_picture_url: "profile/profile-kade.png",
  },
  {
    id: 6,
    name_short: "Kent",
    name_long: "Kent Albert",
    teams: TEAMS["imots_pl"],
    bio: "I’m someone who loves learning, working with data, and keeping traditions alive. Always exploring new ideas and growing step by step.",
    profile_picture_url: "profile/profile-kent.JPG",
  },
  {
    id: 7,
    name_short: "Gilberdi",
    name_long: "Gilberdi Axel",
    teams: TEAMS["imots_pl"],
    bio: "Computer science student who loves building things with code, especially on the backend. Curious about programming languages, philosophy, and books that bend your brain. Bilingual in Indonesian and English.",
    profile_picture_url: "profile/profile-gilberdi.PNG",
  },
  {
    id: 8,
    name_short: "Ceavin",
    name_long: "Ceavin Rufus",
    teams: TEAMS["imots_pl"],
    bio: "I’ve been passionate about programming since junior high school, and over time it naturally led me to pursue both coding and entrepreneurship. I try to approach my work with purpose and responsibility, because as a Wise Man once said, serve others.",
    profile_picture_url: "profile/profile-ceavin.JPG",
  },
];

export default function Collaborator() {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [expandedProfile, setExpandedProfile] =
    useState<ProfileCollaboratorProps | null>(null);

  return (
    <div className="py-32 px-4 md:px-10 flex justify-center flex-col gap-20">
      <motion.h2
        className="text-center flex flex-col text-4xl md:text-5xl font-bold"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInLeft}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        Members
      </motion.h2>
      <div className="flex flex-col gap-10">
        <div
          className={cn(
            "flex flex-wrap items-center justify-center lg:justify-start gap-10 ",
            PROFILE_COLLABORATOR.length > 4 &&
              "sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]"
          )}
        >
          {PROFILE_COLLABORATOR.map((profile) => (
            <motion.div
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
                  scrollToId("content-profile");
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
              className="relative flex items-center justify-center cursor-pointer min-w-[180px] w-fit h-full"
              key={profile.id}
            >
              <div
                className={cn(
                  "border rounded-full transition-transform duration-300",
                  (isHovered === profile.id ||
                    (expandedProfile && expandedProfile.id === profile.id)) &&
                    "border-blue-500 scale-110"
                )}
              >
                <div
                  className={cn(
                    "w-40 h-40 rounded-full border border-transparent bg-white overflow-hidden",
                    (isHovered === profile.id ||
                      (expandedProfile && expandedProfile.id === profile.id)) &&
                      "border-4 border-transparent"
                  )}
                >
                  <div className="relative w-full h-full">
                    {isHovered === profile.id ||
                    (expandedProfile && expandedProfile.id === profile.id) ? (
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
                <h2
                  className={cn(
                    "font-semibold text-shadow",
                    isHovered === profile.id && "text-blue-800"
                  )}
                >
                  {profile.name_short}
                </h2>
                <span className="text-sm font-medium bg-white w-fit border border-gray-200 shadow-xs px-2">
                  #{profile.teams.short}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {expandedProfile !== null && (
            <motion.div
              id="content-profile"
              variants={expandVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-12 px-4 sm:px-0 flex w-full"
            >
              <div className="bg-white border w-full border-gray-200 rounded-xs shadow-xs max-w-[580px] sm:max-w-full p-6 relative">
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
                  <div className="flex-shrink-0">
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

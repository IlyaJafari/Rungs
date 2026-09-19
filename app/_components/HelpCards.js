import Link from "next/link";
import { Rocket, CheckShield, Announcement } from "@boxicons/react";

function HelpCards() {
  const helpTopics = [
    {
      icon: Rocket,
      title: "Getting Started",
      description:
        "Learn how to set up your account, explore key features, and get the most.",
      href: "/help/getting-started",
    },
    {
      icon: CheckShield,
      title: "Security",
      description:
        "Keep your account safe with our advanced security measures.",
      href: "/help/security",
    },
    {
      icon: Announcement,
      title: "News",
      description:
        "Stay up to date with the latest Rungs updates, improvements, and announcements.",
      href: "/help/news",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {helpTopics.map((card) => (
        <div
          key={card.title}
          className="flex flex-col gap-3 rounded-xl border-2 border-steel p-5"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-iron-100">
            <card.icon className="size-5" fill="#2e4c6d" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-medium text-lg">{card.title}</span>
            <span className="text-slate text-sm">{card.description}</span>
          </div>

          <Link
            href={card.href}
            className="text-sm font-medium mt-auto underline underline-offset-2 hover:text-iron"
          >
            Learn More
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HelpCards;

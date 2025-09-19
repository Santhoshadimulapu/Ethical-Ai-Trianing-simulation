import React from "react";
import Link from "next/link";

interface FocusAreaCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  scenarioCount: number;
  color: string;
  href: string;
}

export function FocusAreaCard({ icon, title, description, scenarioCount, color, href }: FocusAreaCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center border border-gray-100">
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${color}`}>{icon}</div>
      <h3 className="font-bold text-xl mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center mb-4">{description}</p>
      <span className="text-sm text-muted-foreground mb-4">{scenarioCount} scenario{scenarioCount !== 1 ? 's' : ''} available</span>
      <Link href={href} className={`w-full font-semibold py-2 rounded-lg transition text-white text-center ${color.replace('bg-', 'bg-')} hover:brightness-110`}>
        Explore Category
      </Link>
    </div>
  );
}

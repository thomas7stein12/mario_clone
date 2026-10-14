import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GameCanvas from "./GameCanvas";
import { getLevelById, levels } from "../level-data";

type GamePageProps = {
  params: Promise<{ levelId: string }>;
};

export function generateStaticParams() {
  return levels.map((level) => ({ levelId: level.id }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { levelId } = await params;
  const level = getLevelById(levelId);

  return {
    title: level ? level.title : "Level not found",
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { levelId } = await params;
  const level = getLevelById(levelId);

  if (!level) notFound();

  return <GameCanvas levelId={level.id} levelTitle={level.title} />;
}

import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: ``,
    description: "",
  };
}

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <h1>Hello Fin NextJS</h1>
    </div>
  );
}

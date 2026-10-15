import { getHomepageContent } from "@/lib/content/repository";
import HomePageClient from "./home-page-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getHomepageContent();
  return <HomePageClient content={content} />;
}

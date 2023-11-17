import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mood-toggle";

export default function Home() {
  return (
    <main>
      <UserButton afterSignOutUrl="/"/>
      <ModeToggle/>
    </main>
  )
}

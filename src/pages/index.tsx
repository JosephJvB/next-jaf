import { Button } from "@/components/svgs/waterButton";
import { Logo } from "@/components/logo/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Logo />
      <Button>Login</Button>
    </main>
  );
}

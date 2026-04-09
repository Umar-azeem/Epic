import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <main className="p-10">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full">Login</Button>
          <Image
            src="/assets/icons/world.svg"
            alt="World Icon"
            width={350}
            height={350}
          />
        </CardContent>
      </Card>
    </main>
  );
}

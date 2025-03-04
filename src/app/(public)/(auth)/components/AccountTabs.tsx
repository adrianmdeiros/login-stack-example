import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

export default function AccountTabs() {
  return (
    <Tabs defaultValue="sign-in" className="w-80 min-h-[460px]">
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <SignInCard />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUpCard />
      </TabsContent>
    </Tabs>
  )
}

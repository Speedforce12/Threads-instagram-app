import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileTabs = () => {
  return (
    <div className='text-white my-8 w-full px-4'>
      <Tabs defaultValue='account'>
        <TabsList className='w-full bg-transparent  border-b rounded-none border-white/30'>
          <TabsTrigger role="link" href="/a"
            value='account'
            className='w-full font-bold text-neutral-500'>
            Account
          </TabsTrigger>
          <TabsTrigger
            value='password'
            className='w-full font-bold text-neutral-500'>
            Password
          </TabsTrigger>
          <TabsTrigger
            value='password'
            className='w-full font-bold text-neutral-500'>
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='password'>Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/constant";

const ProfileTabs = () => {
  return (
    <div className='text-white my-8 w-full px-4'>
      <Tabs defaultValue='Threads'>
        <TabsList className='w-full bg-transparent  border-b rounded-none border-white/30'>
          {profileTabs.map((tab) => (
            <TabsTrigger
              value={tab.name}
              className='w-full font-bold text-neutral-500'
              key={tab.name}>
              {tab.name}
            </TabsTrigger>
          ))}
        
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

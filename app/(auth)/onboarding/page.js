import { currentUser } from "@clerk/nextjs";
import OnBoardingForm from "@/components/OnBoardingForm";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const user = await currentUser();

  const logInUser = await prisma.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (logInUser?.isOnboarded) {
    redirect("/");
  }

  return (
    <div className='flex flex-col items-center  max-w-md w-full px-5 md:px-0'>
      <div className='flex items-start space-y-0.5 justify-start w-full mb-6  flex-col'>
        <h1 className='font-semibold md:text-2xl text-xl'>
          {user?.firstName + "  " + user?.lastName} / Onboarding
        </h1>
        <p
          className='text-xs italic font-light
        '>
          Personalize your account for the world to know who you are
        </p>
      </div>
      <OnBoardingForm />
    </div>
  );
};

export default OnboardingPage;

import Feed from "@/components/Home/Feed/Feed";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import useUserState from "@/core/useStore";

export default function Home() {
  const user = useUserState((state) => state.user);
  return (
    <>
      {user ? (
        <Feed />
      ) : (
        <BackgroundBeamsWithCollision>
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">Sign up to view your feed</span>
            </div>
          </h2>
        </BackgroundBeamsWithCollision>
      )}
    </>
  );
}

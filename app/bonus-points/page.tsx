import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

const BonusPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <div>Access Denied</div>;
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  return (
    <div className="p-4 w-1/3 max-lg:w-full">
      <h1 className="text-3xl mb-4 font-bold" >
        БАЛАНС ВАШИХ БОНУСНИХ БАЛІВ СТАНОВИТЬ:{" "}
        <span className="font-bold text-4xl underline text-chart-1">{user?.bonusPoints}</span>
      </h1>
      <p className="text-2xl">1 бонусний бал = 1 гривня знижки</p>
      <p className="text-2xl mt-2">
        Ви можете використати свої бонусні бали у будь-який час для наступної
        покупки або продовжуйте їх накопичувати.
      </p>
    </div>
  );
};

export default BonusPage;

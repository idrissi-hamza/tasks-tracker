import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

type TimeProps = {
  startAt: string;
};

const Time = ({ startAt }: TimeProps) => {
  const date = new Date(startAt);
  const now = new Date();
  const elapsed = now.getTime() - date.getTime();
  return <div>{elapsed}</div>;
};

type NewTaskProps = {
  task?: Task | null;
};

const NewActivity = ({ task }: NewTaskProps) => {
  async function startActivity(data: FormData) {
    "use server";
    const user = await getUserSession();
    await prisma.task.create({
      data: {
        user: { connect: { id: user.userId } },
        org: { connect: { id: user.orgId } },
        name: data.get("name") as string,
        startAt: new Date(),
      },
    });
    revalidatePath("/track");
  }

  async function stopActivity(data: FormData) {
    "use server";
    await prisma.task.update({
      where: {
        id: data.get("id") as string,
      },
      data: {
        endAt: new Date(),
      },
    });
    revalidatePath("/track");
  }

  return (
    <div>
      <h2>What are you working on?</h2>
      <form
        action={task ? stopActivity : startActivity}
        className="flex items-center space-x-4"
      >
        <Input type="text" name="name" defaultValue={task?.name || ""} />
        <input type="hidden" name="id" defaultValue={task?.id || ""} />
        {task?.startAt && <Time startAt={task.startAt.toString()} />}
        <Button type="submit">{task ? "Stop" : "Start"}</Button>
      </form>
    </div>
  );
};

const DailyActivities = () => {};

export default async function TrackPage() {
  const user = await getUserSession();
  const currentTask = await prisma.task.findFirst({
    where: {
      orgId: user.orgId,
      userId: user.userId,
      endAt: null,
    },
  });

  return (
    <main className="container mx-auto py-4">
      <NewActivity task={currentTask} />
    </main>
  );
}

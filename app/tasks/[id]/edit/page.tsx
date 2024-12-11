import { notFound } from 'next/navigation';
import EditTaskForm from './EditTaskForm';

async function getTask(id: string) {
  const res = await fetch(`http://localhost:3001/tasks/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);
  if (!task) return notFound();

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Task</h1>
      <EditTaskForm task={task} />
    </main>
  );
}

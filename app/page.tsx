import TaskItem from '../components/TaskItem';
import Link from 'next/link';

async function getTasks() {
  const res = await fetch('http://localhost:3001/tasks', { cache: 'no-store' });
  return res.json();
}

export default async function HomePage() {
  const tasks = await getTasks();
  const total = tasks.length;
  const completed = tasks.filter((task: any) => task.completed).length;

  return (
    <main className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Todo List App</h1>
          <Link
            href="/tasks/new"
            className="bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-200 transition"
          >
            + Create Task
          </Link>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <p className="text-gray-700">Total Tasks: <strong>{total}</strong></p>
            <p className="text-gray-700">Completed: <strong>{completed}</strong> of <strong>{total}</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task: any) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}

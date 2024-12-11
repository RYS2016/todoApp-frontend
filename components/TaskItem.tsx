'use client';

import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

export default function TaskItem({ task }: { task: Task }) {
  const router = useRouter();

  const toggleCompletion = async () => {
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });
    router.refresh();
  };

  const deleteTask = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await fetch(`http://localhost:3001/tasks/${task.id}`, { method: 'DELETE' });
      router.refresh();
    }
  };

  return (
    <div
      className={`p-4 rounded shadow transition relative ${
        task.completed ? 'opacity-50' : ''
      }`}
      style={{ backgroundColor: task.color }}
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-800' : 'text-white'}`}>
          {task.title}
        </h2>
        <span
          className={`text-sm px-2 py-1 rounded ${
            task.completed ? 'bg-green-800 text-white' : 'bg-yellow-800 text-white'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={toggleCompletion}
          className={`px-4 py-2 rounded text-white ${
            task.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
          } transition`}
        >
          {task.completed ? 'Mark Pending' : 'Mark Completed'}
        </button>
        <button
          onClick={deleteTask}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Delete
        </button>
        <button
          onClick={() => router.push(`/tasks/${task.id}/edit`)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

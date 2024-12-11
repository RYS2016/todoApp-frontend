'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

export default function EditTaskForm({ task }: { task: Task }) {
  const [title, setTitle] = useState(task.title);
  const [color, setColor] = useState(task.color);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    try {
      await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, color, completed: task.completed }),
      });
      router.push('/'); // Redirect to the home page
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2"
      />
      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border rounded p-2"
      >
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="grey">Grey</option>
      </select>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

import React, { useState } from 'react';
import '../index.css';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      task: 'Learn Webpack Module Federation',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      task: 'Build Microfrontend with React',
      completed: true,
      createdAt: new Date(),
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTask.trim()) {
      const newTodo: Todo = {
        id: Math.max(...todos.map((t) => t.id), 0) + 1,
        task: newTask.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setNewTask('');
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen font-sans'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl sm:text-4xl font-bold text-slate-800 mb-2 drop-shadow-sm'>
          ✅ Todo Manager
        </h2>
        <p className='text-base text-slate-600 font-normal'>
          Stay organized and get things done
        </p>
      </div>

      <div className='bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 border border-slate-200'>
        <div className='flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'>
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='What needs to be done?'
            className='flex-1 px-4 sm:px-5 py-3 border-2 border-slate-200 rounded-lg text-base outline-none transition-all duration-200 bg-slate-50 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 placeholder-slate-400'
          />
          <button
            onClick={addTodo}
            className='px-6 sm:px-7 py-3 bg-emerald-500 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-emerald-600 active:scale-95'
          >
            <span className='text-lg'>+</span>
            <span className='hidden sm:inline'>Add Task</span>
            <span className='sm:hidden'>Add</span>
          </button>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-2 mb-6'>
        {(['all', 'active', 'completed'] as const).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 border-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
              filter === filterType
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            {filterType === 'active' && activeCount > 0 && ` (${activeCount})`}
            {filterType === 'completed' &&
              completedCount > 0 &&
              ` (${completedCount})`}
          </button>
        ))}
      </div>

      <div className='bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200'>
        {filteredTodos.length === 0 ? (
          <div className='text-center py-16 px-6 text-gray-400'>
            <div className='text-6xl mb-4'>📝</div>
            <p className='text-xl mb-2 font-medium'>No tasks found</p>
            <p className='text-base'>Add a new task to get started! 🚀</p>
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <div
              key={todo.id}
              className={`flex items-center px-4 sm:px-6 py-4 transition-all duration-200 hover:bg-slate-50 ${
                todo.completed ? 'bg-slate-50' : 'bg-white'
              } ${
                index !== filteredTodos.length - 1
                  ? 'border-b border-slate-100'
                  : ''
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 mr-4 cursor-pointer flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  todo.completed
                    ? 'bg-emerald-500 border-emerald-500 shadow-lg'
                    : 'border-gray-300 hover:border-emerald-400 hover:shadow-md'
                }`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed && (
                  <span className='text-white text-sm font-bold'>✓</span>
                )}
              </div>

              <span
                className={`flex-1 text-base transition-all duration-200 break-words mr-4 ${
                  todo.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-700'
                }`}
              >
                {todo.task}
              </span>

              <button
                onClick={() => removeTodo(todo.id)}
                className='px-3 py-2 bg-red-500 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 opacity-80 hover:bg-red-600 hover:opacity-100 active:scale-95 flex-shrink-0'
              >
                <span className='hidden sm:inline'>Delete</span>
                <span className='sm:hidden'>🗑️</span>
              </button>
            </div>
          ))
        )}

        {todos.length > 0 && (
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 bg-slate-50 text-sm text-slate-600 border-t border-slate-200 gap-2 sm:gap-0'>
            <span className='font-medium'>Total: {todos.length} tasks</span>
            <span>
              {activeCount} active, {completedCount} completed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;

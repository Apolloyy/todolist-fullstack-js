export default function Task({ title, id, deleteTask, updateTask }) {
  return (
    <div className="bg-neutral-800 w-80 h-fit flex p-2 items-center justify-between">
      <p>{title}</p>
      <div className="flex gap-2">
        <button className="size-6 bg-green-600" onClick={updateTask}></button>
        <button className="size-6 bg-red-600" onClick={deleteTask}></button>
      </div>
    </div>
  );
}

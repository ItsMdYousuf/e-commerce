export default function Code() {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Installation</h2>
      <div className="flex space-x-4">
        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-4 py-2">
          CLI
        </button>
        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-4 py-2">
          Manual
        </button>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-xl font-semibold">CLI</h3>
        <div className="bg-muted text-muted-foreground rounded-lg p-4">
          <code className="text-primary">
            npx shadcn@latest add navigation-menu
          </code>
        </div>
      </div>
    </div>
  );
}

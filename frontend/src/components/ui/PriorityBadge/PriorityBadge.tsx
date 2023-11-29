function getPriorityColor(priority: number): string {
    if (priority < 5) {
        return "bg-emerald-400";
    }

    if (priority < 8) {
        return "bg-amber-400";
    }

    return "bg-red-400";
}

export default function PriorityBadge({ priority }: { priority: number }) {
    return (
        <div
            className={
                `h-7 w-7 flex items-center justify-center rounded-full text-white text-sm ` +
                getPriorityColor(priority)
            }
        >
            {priority}
        </div>
    );
}


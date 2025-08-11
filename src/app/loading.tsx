import { Plane } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8">
        <div className="animate-float">
          <Plane
            size={64}
            className="text-primary drop-shadow-lg transform rotate-45"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground animate-pulse-slow">
            Loading
          </h2>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

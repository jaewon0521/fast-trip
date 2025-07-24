import { MapPin } from "lucide-react";

export default function GoogleMapLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-subtle">
      <div className="p-8 max-w-md w-full mx-4 shadow-soft border-brand-300 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-brand-500 rounded-full flex items-center justify-center animate-pulse">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            지도를 준비중이에요
          </h3>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-brand-700 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

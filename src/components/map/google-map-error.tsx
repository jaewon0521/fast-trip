import { AlertCircle, MapPin } from "lucide-react";

export default function GoogleMapError() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-subtle">
      <div className="p-8 max-w-md w-full mx-4 shadow-soft border-destructive rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              지도 로딩 오류
            </h3>
            {/* <p className="text-muted-foreground">{error}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

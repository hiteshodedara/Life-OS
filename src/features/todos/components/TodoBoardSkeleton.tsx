import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TodoBoardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full flex flex-col gap-4">
          <div className="p-2 rounded-lg bg-muted">
             <Skeleton className="h-7 w-1/2 mx-auto" />
          </div>
          <div className="space-y-4 pr-4">
            {[...Array(3)].map((_, j) => (
              <Card key={j}>
                <CardHeader className="flex flex-row items-start justify-between p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-8 w-8" />
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
           <Skeleton className="h-10 w-full mt-auto" />
        </div>
      ))}
    </div>
  )
}

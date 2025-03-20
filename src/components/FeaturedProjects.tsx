// src/components/FeaturedProjects.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, Code, Server, Github } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CodeSnippet {
  title: string;
  code: string;
  language: string;
  description: string;
}

const ParkManagementSystem = () => {
  const codeSnippets: CodeSnippet[] = [
    {
      title: "Dashboard UI",
      language: "tsx",
      description:
        "React component for the main dashboard, featuring quick actions and reservation list in a responsive layout with styled cards.",
      code: `export function DashboardContent() {
  const searchParams = useSearchParams();
  const { isNewUser } = useUserStatus();
  const showWelcome = searchParams.get("welcome") === "true" || isNewUser;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {showWelcome && (
        <Alert variant="success">
          <AlertTitle>Welcome to the Park Management System!</AlertTitle>
          <AlertDescription>
            Your profile is complete. You can now make reservations for up to 4
            people across 3 consecutive days.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <Button
                onClick={() => (window.location.href = "/reservations/new")}
                variant="ghost"
                className="w-full h-full text-left flex flex-col items-start"
              >
                <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                <span className="font-medium block">Make Reservation</span>
                <span className="text-sm text-gray-600">
                  Book your next visit
                </span>
              </Button>
            </Card>
            {/* Additional cards... */}
          </div>
        </div>
      </div>
    </div>
  );
}`,
    },
    {
      title: "Reservation Form",
      language: "tsx",
      description:
        "React form with date selection, user management, and validation using React Hook Form, Zod schema validation, and custom date availability checking.",
      code: `export const ReservationForm = () => {
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      additionalUsers: [],
    },
  });

  const loadAvailableDates = useCallback(async (signal?: AbortSignal) => {
    setIsLoadingDates(true);
    try {
      const startDate = new Date();
      const endDate = addDays(startDate, 30);
      const response = await reservationService.getAvailableDates(
        startDate,
        endDate,
        signal
      );

      if (!signal?.aborted) {
        if (response.success) {
          setAvailableDates(
            response.data.availableDates.map((date) => new Date(date))
          );
          setError(null);
        } else {
          throw new Error(response.error);
        }
      }
    } catch (err) {
      if (!signal?.aborted) {
        setError(handleFormError(err));
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoadingDates(false);
      }
    }
  }, []);

  // Rest of the component...
}`,
    },
    {
      title: "Custom Alert Component",
      language: "tsx",
      description:
        "Reusable UI component with multiple variants (success, error, warning, info) built with React, TypeScript, and Tailwind CSS.",
      code: `interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "error" | "warning" | "info";
}

export const alertStyles = {
  success: "bg-green-50 text-green-700",
  error: "bg-red-50 text-red-700",
  warning: "bg-yellow-50 text-yellow-700",
  info: "bg-blue-50 text-blue-700",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(\`rounded-md p-4 \${alertStyles[variant]}\`, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-2 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// Additional components...`,
    },
    {
      title: "Custom React Hook",
      language: "typescript",
      description:
        "A custom React hook for managing loading states and errors in a complex form, demonstrating clean state management patterns.",
      code: `export const useLoadingStates = () => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    isLoadingDates: false,
    isLoadingUserReservations: false,
    isValidatingUsers: false,
    isSubmitting: false,
  });

  const [errors, setErrors] = useState<ErrorStates>({
    datesError: null,
    userReservationsError: null,
    validationError: null,
    submissionError: null,
  });

  const setLoading = (key: keyof LoadingStates, value: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  };

  const setError = (key: keyof ErrorStates, error: string | null) => {
    setErrors((prev) => ({ ...prev, [key]: error }));
  };

  const clearErrors = () => {
    setErrors({
      datesError: null,
      userReservationsError: null,
      validationError: null,
      submissionError: null,
    });
  };

  return {
    loadingStates,
    errors,
    setLoading,
    setError,
    clearErrors,
    clearError: (key: keyof ErrorStates) => setError(key, null),
  };
};`,
    },
  ];

  return (
    <Card className="mb-10">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-md">
            <Image
              src="/images/park-management.png"
              alt="Park Management System"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-2xl">Park Management System</CardTitle>
            <CardDescription>
              A full-stack web application for managing park reservations
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-3 py-1"
          >
            <Server className="h-3.5 w-3.5 text-blue-500" />
            <span>Next.js</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-3 py-1"
          >
            <Code className="h-3.5 w-3.5 text-blue-500" />
            <span>TypeScript</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-3 py-1"
          >
            <Users className="h-3.5 w-3.5 text-green-500" />
            <span>User Authentication</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-3 py-1"
          >
            <Calendar className="h-3.5 w-3.5 text-purple-500" />
            <span>Reservation System</span>
          </Badge>
        </div>

        <p className="text-muted-foreground">
          A personal project built to streamline park reservations. Features
          include real-time availability tracking, user registration, an
          interactive dashboard, and a robust reservation system with validation
          rules.
        </p>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Featured Code Snippets</h4>

          <Tabs defaultValue={codeSnippets[0].title} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-2">
              {codeSnippets.map((snippet) => (
                <TabsTrigger
                  key={snippet.title}
                  value={snippet.title}
                  className="text-sm"
                >
                  {snippet.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {codeSnippets.map((snippet) => (
              <TabsContent
                key={snippet.title}
                value={snippet.title}
                className="mt-0"
              >
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground">
                    {snippet.description}
                  </p>
                </div>
                <div className="rounded-md bg-muted p-4 overflow-auto">
                  <pre className="text-sm font-mono text-foreground">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link
            href="https://github.com/yourusername/park-management-system"
            className="gap-2"
          >
            <Github className="h-4 w-4" />
            <span>View on GitHub</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <ParkManagementSystem />

        {/* Add more projects here */}
      </div>
    </section>
  );
}

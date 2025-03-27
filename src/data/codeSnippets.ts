// src/data/codeSnippets.ts
export interface CodeSnippet {
  title: string;
  code: string;
  language: string;
  description: string;
}

export const parkManagementSnippets: CodeSnippet[] = [
  {
    title: "Type Safety Implementation",
    language: "typescript",
    description:
      "End-to-end type safety with TypeScript interfaces and Zod schema validation.",
    code: `// Type definitions with Zod validation
export interface Reservation {
  id: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  additionalUsers: AdditionalUser[];
  status: ReservationStatus;
}

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled";

// API response with discriminated union type
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Zod schema for validation
export const reservationSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  additionalUsers: z.array(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
    })
  ).max(3)
})
.refine(
  data => {
    const days = differenceInDays(
      data.endDate,
      data.startDate
    );
    return days >= 0 && days <= 2;
  },
  {
    message: "Max 3 consecutive days",
    path: ["endDate"],
  }
);`,
  },
  {
    title: "Database Access Patterns",
    language: "typescript",
    description: "Prisma ORM with transaction handling for reservations.",
    code: `// Repository with Prisma transaction
async createReservation(
  userId: string,
  startDate: Date,
  endDate: Date,
  additionalUsers: { name: string; email: string }[]
): Promise<ApiResponse<Reservation>> {
  try {
    // Use transaction for data consistency
    const reservation = await this.prisma.$transaction(
      async (tx) => {
        // Check availability first
        const existingReservations = await tx.reservation.findMany({
          where: {
            OR: [
              {
                AND: [
                  { startDate: { lte: startDate } },
                  { endDate: { gte: startDate } }
                ]
              },
              {
                AND: [
                  { startDate: { lte: endDate } },
                  { endDate: { gte: endDate } }
                ]
              }
            ],
            status: { in: ["pending", "confirmed"] }
          }
        });

        // Check capacity
        const availableSpots = this.calculateAvailableSpots(
          existingReservations,
          startDate,
          endDate
        );

        if (availableSpots < 1 + additionalUsers.length) {
          throw new Error("Not enough capacity");
        }

        // Create reservation with nested data
        return tx.reservation.create({
          data: {
            startDate,
            endDate,
            status: "pending",
            user: { connect: { id: userId } },
            additionalUsers: {
              create: additionalUsers.map(user => ({
                name: user.name,
                email: user.email,
                userId
              }))
            }
          },
          include: { additionalUsers: true }
        });
      }
    );

    return { success: true, data: reservation };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ?
        error.message : "Unknown error"
    };
  }
}`,
  },
  {
    title: "React Custom Hook",
    language: "typescript",
    description: "Custom hook with state management for reservation logic.",
    code: `// Custom React Hook for reservation management
export function useReservationSystem() {
  // State for dates and availability
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null
  });

  // Consolidated loading states
  const [loadingStates, setLoadingStates] = useState({
    isLoadingDates: false,
    isValidatingSelection: false,
    isSubmitting: false,
  });

  // Consolidated error tracking
  const [errors, setErrors] = useState({
    datesError: null,
    validationError: null,
    submissionError: null,
  });

  // Form handling with zod validation
  const formMethods = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      additionalUsers: [],
    },
  });

  // Loading state utility
  const setLoading = useCallback((
    key: keyof typeof loadingStates,
    value: boolean
  ) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Error state utility
  const setError = useCallback((
    key: keyof typeof errors,
    value: string | null
  ) => {
    setErrors(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Load available dates with cleanup
  const loadAvailableDates = useCallback(async () => {
    const controller = new AbortController();
    setLoading('isLoadingDates', true);

    try {
      const response = await reservationService.getAvailableDates(
        new Date(),
        addDays(new Date(), 30),
        controller.signal
      );

      if (!controller.signal.aborted) {
        if (response.success) {
          setAvailableDates(response.data.availableDates);
          setError('datesError', null);
        } else {
          throw new Error(response.error);
        }
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(
          'datesError',
          err instanceof Error ?
            err.message : 'Failed to load dates'
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading('isLoadingDates', false);
      }
    }

    return () => controller.abort();
  }, [setLoading, setError]);

  return {
    availableDates,
    selectedDates,
    loadingStates,
    errors,
    formMethods,
    setSelectedDates,
    loadAvailableDates,
    setError,
    setLoading,
  };
}`,
  },
  {
    title: "Testing Strategy",
    language: "typescript",
    description:
      "Jest and React Testing Library for unit and integration tests.",
    code: `// Unit tests for reservation validation
describe('Reservation Validation', () => {
  const today = new Date();

  test('validates dates within allowed window', () => {
    const startDate = addDays(today, 1);
    const endDate = addDays(today, 3);

    const result = validateReservationDates(startDate, endDate);
    expect(result.isValid).toBe(true);
  });

  test('rejects dates in the past', () => {
    const startDate = subDays(today, 1);
    const endDate = addDays(today, 1);

    const result = validateReservationDates(startDate, endDate);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Cannot start in the past');
  });

  test('rejects reservations longer than 3 days', () => {
    const startDate = addDays(today, 1);
    const endDate = addDays(today, 5);

    const result = validateReservationDates(startDate, endDate);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Max 3 consecutive days');
  });
});

// Mock server for API testing
const server = setupServer(
  rest.get('/api/reservations/available-dates', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: {
        availableDates: [
          "2023-12-01T00:00:00.000Z",
          "2023-12-02T00:00:00.000Z",
          "2023-12-03T00:00:00.000Z",
        ]
      }
    }));
  }),

  rest.post('/api/reservations', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: {
        id: 'test-id',
        startDate: "2023-12-01T00:00:00.000Z",
        endDate: "2023-12-03T00:00:00.000Z",
        status: 'confirmed'
      }
    }));
  })
);

// Integration test
test('completes reservation flow', async () => {
  render(<ReservationPage />);

  // Wait for available dates
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // Select dates and add guest
  await userEvent.click(screen.getByText('1'));
  await userEvent.click(screen.getByText('3'));
  await userEvent.click(screen.getByText('Add Guest'));
  await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
  await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');

  // Submit form
  await userEvent.click(screen.getByText('Complete Reservation'));

  // Check for success
  await waitFor(() => {
    expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
  });
});`,
  },
];

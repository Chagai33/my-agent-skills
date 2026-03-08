/**
 * ✨ Golden Example: Type-Safe Zustand Mocking & Store Resets
 * 
 * Demonstrates:
 * 1. Mocking the hook while keeping generic typings.
 * 2. Resetting the store in `beforeEach` to prevent test bleeding.
 */

// 1. Setup the mock (do this at the top of your test file)
import { useStore } from '../store/useStore';
import { State } from '../store/types'; // Import your exact generic interfaces

jest.mock('../store/useStore');

// 2. Cast the mocked hook to preserve TypeScript strictness
const mockedUseStore = useStore as jest.MockedFunction<typeof useStore>;

// 3. Define the initial, pristine state
const initialState: State<any> = {
    currentEvent: null,
    isLoading: false,
    error: null,
    setCurrentEvent: jest.fn(),
    setLoading: jest.fn(),
    setError: jest.fn(),
    // ...other actions
};

describe('Component with Zustand Store', () => {
    // 4. CRITICAL: Prevent Test Bleeding
    // Zustand stores persist across test runs. 
    // We must rebuild the mock implementation before every test.
    beforeEach(() => {
        jest.clearAllMocks();

        // This is a simplified mock for the selector behavior:
        // useStore((state) => state.property)
        mockedUseStore.mockImplementation((selector: any) => {
            // For exhaustive mocks, you could implement the actual selector logic:
            // return selector(initialState);

            // For standard tests, evaluating the given state is usually enough.
            return selector(initialState);
        });
    });

    it('should handle custom state injection safely', () => {
        // You can locally override the state for a specific test
        const customState = { ...initialState, isLoading: true };
        mockedUseStore.mockImplementation((selector: any) => selector(customState));

        // Assertions...
    });
});

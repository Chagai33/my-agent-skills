/**
 * ✨ Golden Example: Type-Safe Firebase Mocking
 * 
 * Demonstrates how to mock specific Firebase Realtime DB and Cloud Function
 * endpoints without relying on the 'any' type.
 */

import { httpsCallable } from 'firebase/functions';
import { ref, get, set, runTransaction } from 'firebase/database';

// 1. Mock only the specific modules you need
jest.mock('firebase/functions', () => ({
    getFunctions: jest.fn(),
    httpsCallable: jest.fn()
}));

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    runTransaction: jest.fn()
}));

// 2. Safely cast the mocks to preserve TypeScript Strict Mode
const mockedHttpsCallable = httpsCallable as jest.MockedFunction<typeof httpsCallable>;
const mockedRef = ref as jest.MockedFunction<typeof ref>;
const mockedGet = get as jest.MockedFunction<typeof get>;
const mockedRunTransaction = runTransaction as jest.MockedFunction<typeof runTransaction>;

describe('Firebase Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should mock a Cloud Function call safely', async () => {
        // Setup the mock response
        const mockCallableFn = jest.fn().mockResolvedValue({ data: { success: true } });
        mockedHttpsCallable.mockReturnValue(mockCallableFn);

        // Call your actual service (which interacts with httpsCallable)
        // const result = await MyFirebaseService.invokeCloudFunction();

        // Assertions
        expect(mockedHttpsCallable).toHaveBeenCalled();
        expect(mockCallableFn).toHaveBeenCalledWith(/* expected params */);
    });

    it('should mock a Realtime Database get request', async () => {
        // Mock the reference (builder pattern often used in Firebase)
        mockedRef.mockReturnValue({} as any); // Sometimes empty object cast is needed for complex classes if not fully mocked

        // Mock the snapshot result
        mockedGet.mockResolvedValue({
            exists: () => true,
            val: () => ({ id: '123', name: 'Test Event' })
        } as any);

        // Call your service
        // const event = await MyFirebaseService.fetchEventDetails('123');

        // Assertions
        expect(mockedRef).toHaveBeenCalled();
        expect(mockedGet).toHaveBeenCalled();
    });
});

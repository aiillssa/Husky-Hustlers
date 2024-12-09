// SumComponent.test.js
import { render, screen, waitFor, within } from '@testing-library/react';
import DummyComponent from '../components/dummyTestComponent';
import { getShopWithUserID, googleSignUp } from '../utils/api';
import BusinessPage from '../pages/BusinessPage/BusinessPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../utils/api', () => ({
  getShopWithUserID: jest.fn(),
}));


test('displays new test', async () => {
  const mockUserID = 1;
  const mockShopInfo = { id: 1, name: 'Mock Shop' };
  (getShopWithUserID as jest.Mock).mockResolvedValue(mockShopInfo);

  const result = await getShopWithUserID(mockUserID);
  expect(getShopWithUserID).toHaveBeenCalledWith(mockUserID);
  expect(result).toEqual(mockShopInfo);
});

describe('BusinessPage', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    // Mock localStorage to simulate a user ID
    Storage.prototype.getItem = jest.fn(() => '1');
  });

  it('displays "Add my business" button when the user has no shop', async () => {
    // Mock a 404 response for no shop
    (getShopWithUserID as jest.Mock).mockRejectedValue({
      response: { status: 404 }, 
    });

    render(
      <MemoryRouter>
        <BusinessPage />
      </MemoryRouter>
    );

    // Check the "Add my business" button is rendered
    await waitFor(() => {
      expect(screen.getByText('Add my business')).toBeInTheDocument();
    });

    // Verify that the no shop message is displayed
    expect(
      screen.getByText(
        'You do not have a shop right now. Click add your business button to add your business.'
      )
    ).toBeInTheDocument();
  });

  
  it('displays the shop name when the user has a shop', async () => {
    // Mock shop data returned from the API
    const mockShopData = {
      hasShop: true,
      shop: {
        shopName: 'Mock Shop',
        shopDescription: 'This is a test shop',
        contactInformation: { instagram: 'mock_insta' },
      },
    };

    // Mock API call to return the shop data
    (getShopWithUserID as jest.Mock).mockResolvedValue(mockShopData);

    render(
      <MemoryRouter>
        <BusinessPage />
      </MemoryRouter>
    );

    // Wait for the shop name to appear on the page
    await waitFor(() => {
      expect(screen.getByText('Mock Shop')).toBeInTheDocument();
    });
  });
});
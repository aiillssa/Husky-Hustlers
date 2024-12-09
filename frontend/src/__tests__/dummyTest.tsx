// SumComponent.test.js
import { render, screen, waitFor, within } from '@testing-library/react';
import DummyComponent from '../components/dummyTestComponent';
import { getShopWithUserID } from '../utils/api';
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

  it('displays the shop information when the user has a shop', async () => {
    // Mock a successful response with shop data
    const mockShopData = {
      hasShop: true,
      shop: {
        idshops: 1,
        shopName: 'Mock Shop',
        shopDescription: 'A description of the mock shop.',
        contactInformation: { instagram: '@mockshop' },
      },
    };

    (getShopWithUserID as jest.Mock).mockResolvedValue(mockShopData);
  
    // Render the component
    render(
      <MemoryRouter>
        <BusinessPage />
      </MemoryRouter>
    );
  
    // Verify shop name and description are displayed
    await waitFor(() => {
      expect(screen.getByText('Mock Shop')).toBeInTheDocument();
      expect(screen.getByText('A description of the mock shop.')).toBeInTheDocument();
    });
  
  });
  
  it('displays an error message when the API call fails unexpectedly', async () => {
    // Response when there is an error
    (getShopWithUserID as jest.Mock).mockRejectedValue(new Error('Network Error'));

    // Render component
    render(
      <MemoryRouter>
        <BusinessPage />
      </MemoryRouter>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Cannot fetch your business data.')).toBeInTheDocument();
    });
  });

  it('displays the banner URL when a user has a shop', async () => {
    // Sucess response when user has a shop
    const mockShopData = {
      hasShop: true,
      shop: {
        idshops: 1,
        shopName: 'Mock Shop',
        shopDescription: 'A description of the mock shop.',
        contactInformation: { instagram: '@mockshop' },
      },
    };
    (getShopWithUserID as jest.Mock).mockResolvedValue(mockShopData);

    // Render business page
    render(
      <MemoryRouter>
        <BusinessPage />
      </MemoryRouter>
    );

    // Check if shop banner is displayed
    await waitFor(() => {
      const banner = screen.getByRole('img');
      expect(banner).toHaveAttribute('src', 'http://localhost:8088/blob/1/banner');
    });
  });
});

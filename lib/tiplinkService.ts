// lib/tiplinkService.ts

export const createLink = async (): Promise<{ link: string }> => {
    try {
      const response = await fetch('/api/tiplink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'createLink' }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create TipLink');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create TipLink:', error);
      throw error;
    }
  };
  
  export const connectClient = async (): Promise<{ link: string }> => {
    try {
      const response = await fetch('/api/tiplink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'connectClient' }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to connect client');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to connect client:', error);
      throw error;
    }
  };
  
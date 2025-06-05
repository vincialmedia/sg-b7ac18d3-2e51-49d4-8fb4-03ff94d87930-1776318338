export {};

declare global {
  interface Window {
    /**
     * HubSpot tracking queue.
     * Commands are pushed to this array.
     * Examples:
     * _hsq.push(['setPath', '/new-page']);
     * _hsq.push(['identify', { email: 'user@example.com' }]);
     * _hsq.push(['trackEvent', { id: 'event-id', value: 10 }]);
     */
    _hsq: Array<[string, ...unknown[]]>;
  }
}

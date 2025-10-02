describe('Mock Function Examples', () => {
  it('should create a basic mock function', () => {
    const mockFn = jest.fn();
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });
});

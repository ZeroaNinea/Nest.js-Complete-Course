describe('Mock Function Examples', () => {
  it('should create a basic mock function', () => {
    const mockFn = jest.fn();
    mockFn.mockReturnValue(1);
    mockFn();

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn()).toBe(1);
  });
});

describe('Mock Function Examples', () => {
  it('should create a basic mock function', () => {
    const mockFn = jest.fn();
    mockFn.mockReturnValue(1);
    mockFn();

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn()).toBe(1);
  });

  it('should create a mock function with an argument', () => {
    const mockFn = jest.fn((createSongDto) => ({
      ...createSongDto,
      id: 1,
    }));
    mockFn.mockReturnValue({ title: 'test', id: 1 });

    expect(mockFn({ title: 'test' })).toEqual({ title: 'test', id: 1 });
  });

  it('should create a mock function with an argument with mock implementation', () => {
    const mockCreateSong = jest.fn((createSongDto) => ({
      ...createSongDto,
      id: 1,
    }));

    expect(mockCreateSong({ title: 'test' })).toEqual({ title: 'test', id: 1 });
  });
});

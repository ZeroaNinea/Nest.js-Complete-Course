const songRepository = {
  create: (createSongDto: { title: string }) => {
    return {
      ...createSongDto,
      id: 1,
    };
  },
  find: () => {},
  findOne: () => {},
};

describe('spyOn Demo', () => {
  it('should spy on the existing object', () => {
    const spy = jest.spyOn(songRepository, 'create');
    songRepository.create({ title: 'test' });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ title: 'test' });
  });
});

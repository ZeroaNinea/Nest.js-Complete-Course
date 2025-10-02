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

class ArtistRepository {
  save(createArtistDto: { name: string }) {}
}

describe('spyOn Demo', () => {
  it('should spy on the existing object', () => {
    const spy = jest.spyOn(songRepository, 'create');
    songRepository.create({ title: 'test' });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ title: 'test' });
  });

  it('should spy on the class method', () => {
    const artist = new ArtistRepository();
    const spy = jest
      .spyOn(artist, 'save')
      .mockImplementation((createArtistDto) => createArtistDto);

    artist.save({ name: 'test' });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ name: 'test' });
  });

  afterEach(() => jest.resetAllMocks());
});

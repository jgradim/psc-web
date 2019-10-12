import * as workshops from 'src/lib/workshops';

describe('#sortedWorkshops', () => {
  it('no object with slug', () => {
    expect(workshops.sortedWorkshops([{blah: ''}])).toEqual([]);
  });

  it('returns the array ordered', () => {
    expect(workshops.sortedWorkshops([{slug: 'unreal'}, {slug: 'coffee'}])).toEqual([{slug: 'coffee'}, {slug: 'unreal'}]);
  });
});

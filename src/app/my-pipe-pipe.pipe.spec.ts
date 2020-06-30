import { MyPipePipePipe } from './my-pipe-pipe.pipe';

describe('MyPipePipePipe', () => {
  it('create an instance', () => {
    const pipe = new MyPipePipePipe();
    expect(pipe).toBeTruthy();
  });
});

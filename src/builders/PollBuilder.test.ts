import { PollLayoutType } from '../types/enums.js';
import { PollAnswer, PollMedia } from '../types/PollCreateRequest.js';
import { PollBuilder } from './PollBuilder.js';

describe(PollBuilder.name, () => {
  const question: PollMedia = { text: '<question>' };

  describe('constructor', () => {
    it('should set the given question', () => {
      const actual = new PollBuilder(question).toJSON();
      const expected = expect.objectContaining({ question });
      expect(actual).toStrictEqual(expected);
    });

    it('should set the given answers', () => {
      const answers: PollAnswer[] = [{ poll_media: { text: '<option1>' } }, { poll_media: { text: '<option2>' } }];
      const actual = new PollBuilder(question, answers).toJSON();
      const expected = expect.objectContaining({ answers });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(PollBuilder.prototype.addAnswer.name, () => {
    it('should add an answer with the given values', () => {
      const answer: PollAnswer = { poll_media: { text: '<option1>' }, answer_id: 123_456 };
      const embed = new PollBuilder(question).addAnswer(answer.poll_media, answer.answer_id).toJSON().answers;
      const expected = [expect.objectContaining(answer)];
      expect(embed).toStrictEqual(expected);
    });
  });

  describe(PollBuilder.prototype.setDuration.name, () => {
    it('should set the duration', () => {
      const actual = new PollBuilder(question).setDuration('<duration>').toJSON();
      const expected = expect.objectContaining({ duration: '<duration>' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(PollBuilder.prototype.setAllowMultiselect.name, () => {
    it('should set the allow multiselect to true', () => {
      const actual = new PollBuilder(question).setAllowMultiselect(true).toJSON();
      const expected = expect.objectContaining({ allow_multiselect: true });
      expect(actual).toStrictEqual(expected);
    });

    it('should set the allow multiselect to false', () => {
      const actual = new PollBuilder(question).setAllowMultiselect(false).toJSON();
      const expected = expect.objectContaining({ allow_multiselect: false });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(PollBuilder.prototype.setLayoutType.name, () => {
    it('should set the layout type', () => {
      const actual = new PollBuilder(question).setLayoutType(PollLayoutType.DEFAULT).toJSON();
      const expected = expect.objectContaining({ layout_type: PollLayoutType.DEFAULT });
      expect(actual).toStrictEqual(expected);
    });
  });
});

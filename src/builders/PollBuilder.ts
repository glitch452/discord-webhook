import { PollLayoutType } from '../types/enums.js';
import { PollAnswer, PollCreateRequest, PollMedia } from '../types/PollCreateRequest.js';

export class PollBuilder {
  private poll: PollCreateRequest;

  constructor(question: PollMedia, answers: PollAnswer[] = []) {
    this.poll = { question, answers };
  }

  toJSON(): PollCreateRequest {
    return this.poll;
  }

  addAnswer(pollMedia: PollMedia, answerId?: number): this {
    this.poll.answers.push({ poll_media: pollMedia, answer_id: answerId });
    return this;
  }

  setDuration(duration: string): this {
    this.poll.duration = duration;
    return this;
  }

  setAllowMultiselect(allow: boolean): this {
    this.poll.allow_multiselect = allow;
    return this;
  }

  setLayoutType(layoutType: (typeof PollLayoutType)[keyof typeof PollLayoutType]): this {
    this.poll.layout_type = layoutType;
    return this;
  }
}

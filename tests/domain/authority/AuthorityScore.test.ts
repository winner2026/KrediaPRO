import { describe, expect, it } from 'vitest';
import { AuthorityScore } from '../../../src/domain/authority/AuthorityScore';

describe('AuthorityScore', () => {
  it('is authoritative when score meets threshold', () => {
    const score = new AuthorityScore(80);
    expect(score.isAuthoritative()).toBe(true);
  });

  it('is not authoritative when score is too low', () => {
    const score = new AuthorityScore(40);
    expect(score.isAuthoritative()).toBe(false);
  });

  it('evaluates the exact threshold as authoritative', () => {
    const score = new AuthorityScore(75);
    expect(score.isAuthoritative()).toBe(true);
  });
});


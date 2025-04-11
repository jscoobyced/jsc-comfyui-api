import { getCurrentDate } from './date';

export const log = (...messages: (string | number)[]) => {
  const content = messages.join(' ');
  console.log(`[LOG] ${getCurrentDate()} - ${content}`);
};

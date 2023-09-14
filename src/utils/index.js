import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

export function getRandomPrompt(prompt) {
  const randIdx = Math.floor(Math.random() * surpriseMePrompts.length);

  const randPrompt = surpriseMePrompts[randIdx];

  if (randPrompt === prompt) return getRandomPrompt(prompt);

  return randPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `apixi-download-${_id}.jpg`);
}

import { ChangeEvent, forwardRef } from 'react';
import { ResultFile } from '../types/analyze';

import CanvasWorker from '../worker/canvas?worker';

interface ChildProps {
  onComplete: (resultFile: ResultFile) => void;
  onDisable: () => void;
}

let onGlobalDisable: () => void;
let onGlobalComplete: (resultFile: ResultFile) => void;

const preProcessing = (
  file: File,
  obj?: HTMLInputElement | null
): Promise<ResultFile> => {
  return new Promise((resolve, reject) => {
    const worker = new CanvasWorker();
    worker.onmessage = (event) => {
      worker.terminate();

      if (obj) obj.value = '';
      resolve(event.data);
    };

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        worker.postMessage({ buffer: reader.result, fileType: file.type });
      };
    } catch (e) {
      worker.terminate();
      reject(e);
    } finally {
      if (obj) obj.value = '';
    }
  });
};

const onChange = async (
  event: ChangeEvent<HTMLInputElement>,
  obj: HTMLInputElement | null
) => {
  if (event.target.files?.[0]) {
    onGlobalDisable();
    const data = await preProcessing(event.target.files?.[0], obj);
    onGlobalComplete(data);
  }
};

export const Process = forwardRef<HTMLInputElement, ChildProps>(
  (props, ref) => {
    const { onComplete, onDisable } = props;
    onGlobalDisable = onDisable;
    onGlobalComplete = onComplete;

    return (
      <input
        ref={ref}
        type="file"
        hidden
        onChange={(e) => onChange(e, e.target)}
      />
    );
  }
);

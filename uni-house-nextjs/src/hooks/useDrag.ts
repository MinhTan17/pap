import { useState, useCallback, MouseEvent } from 'react';

interface UseDragProps {
  onDragLeft?: () => void;
  onDragRight?: () => void;
  threshold?: number;
}

interface UseDragReturn {
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  isDragging: boolean;
}

export function useDrag({
  onDragLeft,
  onDragRight,
  threshold = 50,
}: UseDragProps): UseDragReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragEnd, setDragEnd] = useState<number>(0);

  const onMouseDown = useCallback((e: MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragEnd(e.clientX);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setDragEnd(e.clientX);
    },
    [isDragging]
  );

  const onMouseUp = useCallback(() => {
    if (!isDragging) return;

    const distance = dragStart - dragEnd;
    const isLeftDrag = distance > threshold;
    const isRightDrag = distance < -threshold;

    if (isLeftDrag && onDragLeft) {
      onDragLeft();
    }

    if (isRightDrag && onDragRight) {
      onDragRight();
    }

    // Reset values
    setIsDragging(false);
    setDragStart(0);
    setDragEnd(0);
  }, [isDragging, dragStart, dragEnd, threshold, onDragLeft, onDragRight]);

  const onMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(0);
      setDragEnd(0);
    }
  }, [isDragging]);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    isDragging,
  };
}

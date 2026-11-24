import { useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import imageIcon from '../../assets/icons/image.svg';
import Button from './Button';
import * as S from './ImageUpload.styles';

interface ImageUploadProps {
  label: string;
  value: string | null; // 미리보기로 보여 줄 이미지 주소
  onSelect: (file: File) => void; // 파일을 골랐을 때
  onRemove: () => void; // 이미지를 지울 때
  error?: string;
}

export default function ImageUpload({
  label,
  value,
  onSelect,
  onRemove,
  error,
}: ImageUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
    // 같은 파일을 다시 골라도 change 이벤트가 발생하도록 값을 비운다
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); // 브라우저가 파일을 새 탭으로 여는 기본 동작을 막는다
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onSelect(file);
  };

  return (
    <S.Field>
      <S.Label as="span">{label}</S.Label>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        className="sr-only"
        onChange={handleChange}
      />

      {value ? (
        <S.Preview>
          <img src={value} alt="썸네일 미리보기" />
          <S.PreviewActions>
            <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
              이미지 변경
            </Button>
            <Button size="sm" variant="secondary" onClick={onRemove}>
              삭제
            </Button>
          </S.PreviewActions>
        </S.Preview>
      ) : (
        <S.DropZone
          htmlFor={inputId}
          $isDragging={isDragging}
          $hasError={Boolean(error)}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <img src={imageIcon} alt="" width={32} height={32} />
          <span>
            <strong>이미지 선택</strong> 또는 끌어다 놓기
          </span>
          <S.Hint>PNG, JPG, WEBP, GIF · 최대 2MB</S.Hint>
        </S.DropZone>
      )}

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Field>
  );
}
